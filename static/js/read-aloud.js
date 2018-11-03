function listElements() {
    var dialog = document.title;

    var main = document.body.children;
    for (var i = 0; i < main.length; i++) {
        dialog += main[i].textContent;
    }

    dialog.replace(/\r?\n/g, "");
    dialog.replace(/\s\s+/g, "");
    play(dialog.substr(0,900));
}

function play(string) {
    var cognitoParams = {
        IdentityPoolId: "us-west-2:bd2e37fd-10a8-4f08-8694-1b14e52b117b"
    };
    var awsCredentials = new AWS.CognitoIdentityCredentials(cognitoParams);

    var settings = {
        awsCredentials: awsCredentials,
        awsRegion: "us-west-2",
        pollyVoiceId: "Mizuki",
        cacheSpeech: true
    }
    var kathy = ChattyKathy(settings);

    kathy.Speak(string);

    if (kathy.IsSpeaking()) {
        kathy.ShutUp();
    }

    kathy.ForgetCachedSpeech();
};