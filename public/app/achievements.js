(function() {
  var notifications = {
    "deathfromabove": {
      me: { message: "Oiseau de proie", sound: "deathfromabove-me" },
      them: { message: "Mort d'en haut", sound: "deathfromabove-them" }
    },
    "suicide": {
      me: { message: "", sound: "" },
      them: { message: "Mort comme une merde", sound: "suicide-them" }
    },
    "counter": {
      me: { message: "Conteur", sound: "counter-me" },
      them: { message: "Refusé", sound: "counter-them" }
    },
    "headshot": {
      me: { message: "Touché en pleine tête", sound: "headshot-me" },
      them: { message: "Frapé en pleine façe", sound: "headshot-them" }
    },
    "killstreak-3": {
      me: { message: "Série de meutres", sound: "killstreak-3" },
      them: { message: "Agneau à l'abattoir", sound: "killstreak-them" }
    },
    "killstreak-6": {
      me: { message: "Déchaînement", sound: "killstreak-6" },
      them: { message: "Agneau à l'abattoir", sound: "killstreak-them" }
    },
    "killstreak-9": {
      me: { message: "Domination", sound: "killstreak-9" },
      them: { message: "Agneau à l'abattoir", sound: "killstreak-them" }
    },
    "killstreak-12": {
      me: { message: "Instopable", sound: "killstreak-12" },
      them: { message: "Agneau à l'abattoir", sound: "killstreak-them" }
    },
    "killstreak-15": {
      me: { message: "Comme Un Dieu", sound: "killstreak-15" },
      them: { message: "Agneau à l'abattoir", sound: "killstreak-them" }
    },
  };

  var killStreak = 0;

  function resetKillStreak() {
    killStreak = 0;
    updateProgressBar();
  }

  function updateProgressBar() {
    $("#streakProgress").css({
      width: ((killStreak/15) * 100).toString() + "%"
    });
  }

  function incrementKillStreak() {
    killStreak += 3;
    updateProgressBar();
  }

  function init() {
    app.game.achievementsReceived = achievementsReceived;
  }

  function playerId() {
    return app.game.playerId();
  }

  function achievementsReceived(achievements) {
    _.each(achievements, function(achievement) {
      if(!notifications[achievement.type]) return;

      if(achievement.details.killer.id == playerId()) {
        app.notification.queue(notifications[achievement.type].me);
        if(achievement.type.match(/killstreak/)) {
          incrementKillStreak();
        }
      } else if(achievement.details.killed.id == playerId()) {
        app.notification.queue(notifications[achievement.type].them);
      }
    });
  }

  app.achievements = { };
  app.achievements.init = init;
  app.achievements.resetKillStreak = resetKillStreak;
})();
