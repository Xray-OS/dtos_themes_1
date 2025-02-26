var panel = new Panel
var panelScreen = panel.screen

// No need to set panel.location as ShellCorona::addPanel will automatically pick one available edge

// For an Icons-Only Task Manager on the bottom, *3 is too much, *2 is too little
// Round down to next highest even number since the Panel size widget only displays
// even numbers
panel.location = "bottom"
panel.hiding = "normal"
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2)

// Restrict horizontal panel to a maximum size of a 21:9 monitor
const maximumAspectRatio = 21/9;
if (panel.formFactor === "horizontal") {
    const geo = screenGeometry(panelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        panel.alignment = "center";
        panel.minimumLength = maximumWidth;
        panel.maximumLength = maximumWidth;
    }
}

// Adding quick launcher for settings
var quickLauncher = panel.addWidget("org.kde.plasma.quicklaunch");
quickLauncher.currentConfigGroup = ["General"];
quickLauncher.writeConfig("launcherUrls", "file:/usr/share/applications/systemsettings.desktop");
// quickLauncher.writeConfig("launcherUrls", "file:///usr/share/applications/systemsettings.desktop");

//panel.addWidget("org.kde.plasma.quicklaunch")

// Adding quick launcher for trashcan
panel.addWidget("org.kde.plasma.trash")

// Adding Panel Spacer
panel.addWidget("org.kde.plasma.panelspacer")

// Adding Kickoff Launcher
var launcher = panel.addWidget("org.kde.plasma.kickoff")
launcher.currentConfigGroup = ["Shortcuts"];
launcher.writeConfig("global", "Alt+F1");

// Change the launcher icon
launcher.currentConfigGroup = ["/Configuration/General"];
launcher.writeConfig("icon", "DT_OS-logo");

// // Adding Icon Tasks
// panel.addWidget("org.kde.plasma.icontasks");
var iconTasks = panel.addWidget("org.kde.plasma.icontasks");
iconTasks.currentConfigGroup = ["General"];
iconTasks.writeConfig("launchers", "file:/usr/share/applications/org.kde.discover.desktop,file:/usr/share/applications/org.kde.dolphin.desktop,file:/usr/share/applications/floorp.desktop");

// Another Panel Spacer
panel.addWidget("org.kde.plasma.panelspacer")

//var kickoff = panel.addWidget("org.kde.plasma.kickoff")
//kickoff.currentConfigGroup = ["Shortcuts"]
//kickoff.writeConfig("global", "Alt+F1")

//panel.addWidget("org.kde.plasma.showActivityManager")
panel.addWidget("org.kde.plasma.pager")
panel.addWidget("org.kde.plasma.marginsseparator")


/* Next up is determining whether to add the Input Method Panel
 * widget to the panel or not. This is done based on whether
 * the system locale's language id is a member of the following
 * white list of languages which are known to pull in one of
 * our supported IME backends when chosen during installation
 * of common distributions. */

var langIds = ["as",    // Assamese
"bn",    // Bengali
"bo",    // Tibetan
"brx",   // Bodo
"doi",   // Dogri
"gu",    // Gujarati
"hi",    // Hindi
"ja",    // Japanese
"kn",    // Kannada
"ko",    // Korean
"kok",   // Konkani
"ks",    // Kashmiri
"lep",   // Lepcha
"mai",   // Maithili
"ml",    // Malayalam
"mni",   // Manipuri
"mr",    // Marathi
"ne",    // Nepali
"or",    // Odia
"pa",    // Punjabi
"sa",    // Sanskrit
"sat",   // Santali
"sd",    // Sindhi
"si",    // Sinhala
"ta",    // Tamil
"te",    // Telugu
"th",    // Thai
"ur",    // Urdu
"vi",    // Vietnamese
"zh_CN", // Simplified Chinese
"zh_TW"] // Traditional Chinese

if (langIds.indexOf(languageId) != -1) {
    panel.addWidget("org.kde.plasma.kimpanel");
}

panel.addWidget("org.kde.plasma.systemtray")
panel.addWidget("org.kde.plasma.digitalclock")
panel.addWidget("org.kde.plasma.showdesktop")





