const mineflayer = require('mineflayer');

// Configuration settings for your SMP
const botOptions = {
    host: 'rajeshamakvana.aternos.me',     // e.g., 'myserver.aternos.me'
    port: 25565,                     // Default Minecraft port (change if needed)
    username: 'owner rahulkole999',        // The name your bot will use in-game
    // password: 'YOUR_PASSWORD',    // Uncomment if using Microsoft/Legitimate account authentication
    // version: '1.20.4'             // Uncomment and set version if auto-detect fails
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botOptions);

    bot.on('spawn', () => {
        console.log(`[Bot] Successfully spawned in the world as ${bot.username}`);
        
        // Optional: If your server uses an auth plugin (e.g., AuthMe)
        setTimeout(() => {
            // bot.chat('/login YourPasswordHere');
        }, 3000);
    });

    // --- Anti-AFK & Loop Behavior ---
    bot.on('kicked', (reason) => {
        console.log(`[Bot] Kicked from server for reason: ${reason}`);
    });

    bot.on('error', (err) => {
        console.log(`[Bot] Encountered error:`, err);
    });

    bot.on('end', () => {
        console.log('[Bot] Disconnected from server. Attempting to reconnect in 10 seconds...');
        setTimeout(createBot, 10000); // Reconnect loop
    });

    // Simple anti-AFK loop: looks around and jumps periodically
    setInterval(() => {
        if (!bot.entity) return;
        
        // Randomly look around slightly to prevent inactivity kicks
        const yaw = bot.entity.yaw + 0.5;
        const pitch = (Math.random() * 0.4) - 0.2;
        bot.look(yaw, pitch, false);

        // Jump every so often
        bot.setControlState('jump', true);
        setTimeout(() => {
            bot.setControlState('jump', false);
        }, 500);

        console.log('[Anti-AFK] Performed movement action to stay active.');
    }, 60000); // Runs every 60 seconds
}

// Start the bot instance
createBot();

