import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function verifyAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorized");

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims?.sub) throw new Error("Unauthorized");

  const callerId = claimsData.claims.sub as string;

  const adminClient = createClient(supabaseUrl, serviceKey);
  const { data: roles } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", callerId)
    .eq("role", "admin");
  if (!roles || roles.length === 0) throw new Error("Forbidden: admin only");

  return { adminClient, callerId };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { adminClient } = await verifyAdmin(req);
    const { action, userId, userIds } = await req.json();

    // Action: get-users-auth-info — fetch last_sign_in_at and banned status for a list of user IDs
    if (action === "get-users-auth-info") {
      const ids: string[] = userIds || [];
      if (ids.length === 0) {
        return new Response(JSON.stringify({ users: {} }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const results: Record<string, { last_sign_in_at: string | null; banned: boolean }> = {};

      // Fetch users in batches (admin API lists users with pagination)
      // Use getUserById for each user since there's no bulk endpoint
      await Promise.all(
        ids.map(async (id: string) => {
          try {
            const { data, error } = await adminClient.auth.admin.getUserById(id);
            if (!error && data?.user) {
              results[id] = {
                last_sign_in_at: data.user.last_sign_in_at || null,
                banned: data.user.banned_until
                  ? new Date(data.user.banned_until).getTime() > Date.now()
                  : false,
              };
            }
          } catch {
            // skip
          }
        })
      );

      return new Response(JSON.stringify({ users: results }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: toggle-ban — ban or unban a user
    if (action === "toggle-ban") {
      if (!userId) {
        return new Response(JSON.stringify({ error: "userId required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get current status
      const { data: userData, error: getErr } = await adminClient.auth.admin.getUserById(userId);
      if (getErr || !userData?.user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const isBanned = userData.user.banned_until
        ? new Date(userData.user.banned_until).getTime() > Date.now()
        : false;

      if (isBanned) {
        // Unban
        const { error } = await adminClient.auth.admin.updateUserById(userId, {
          ban_duration: "none",
        });
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ success: true, banned: false }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        // Ban for 876000 hours (~100 years)
        const { error } = await adminClient.auth.admin.updateUserById(userId, {
          ban_duration: "876000h",
        });
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ success: true, banned: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Action: reset-password — send password reset email
    if (action === "reset-password") {
      if (!userId) {
        return new Response(JSON.stringify({ error: "userId required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: userData } = await adminClient.auth.admin.getUserById(userId);
      if (!userData?.user?.email) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await adminClient.auth.resetPasswordForEmail(userData.user.email);
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const status = msg.includes("Unauthorized") ? 401 : msg.includes("Forbidden") ? 403 : 500;
    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
