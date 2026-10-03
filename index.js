const PLACE_ID = "101770480176177";
const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const PREVIOUS = process.env.PREVIOUS_STATE || "";

if (!WEBHOOK) throw new Error("Missing DISCORD_WEBHOOK_URL");

async function getUniverseId() {
  const r = await fetch(`https://www.roblox.com/games/${PLACE_ID}`);
  if (!r.ok) throw new Error(`Roblox page ${r.status}`);
  const html = await r.text();
  const m = html.match(/data-universe-id="(\d+)"/);
  if (!m) throw new Error("Could not find the game's universe ID");
  return m[1];
}

async function getGame(universeId) {
  const r = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
  if (!r.ok) throw new Error(`Roblox API ${r.status}`);
  const j = await r.json();
  return j.data?.[0];
}

async function notify(game) {
  const r = await fetch(WEBHOOK, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
      username: "Command An Army Alerts",
      embeds: [{
        title: "Command An Army changed",
        description:
          `Public game information changed.\n\n` +
          `Game: ${game.name}\n` +
          `Updated: ${game.updated}\n` +
          `Players: ${game.playing}\n\n` +
          `${(game.description || "").slice(0, 700)}`,
        color: 0x5865F2,
        timestamp: new Date().toISOString()
      }]
    })
  });
  if (!r.ok) throw new Error(`Discord ${r.status}: ${await r.text()}`);
}

const universeId = await getUniverseId();
const game = await getGame(universeId);

const current = JSON.stringify({
  name: game.name,
  description: game.description,
  updated: game.updated
});

if (PREVIOUS && PREVIOUS !== current) {
  await notify(game);
  console.log("ALERT_SENT");
} else {
  console.log(PREVIOUS ? "NO_CHANGE" : "BASELINE");
}

console.log("STATE:" + Buffer.from(current).toString("base64"));
