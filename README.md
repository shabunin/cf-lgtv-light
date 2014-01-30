Descriptiom
=============

This is module for control LG over TCP/IP. This is light version - you can send only keys that listed in the end of this description. For additional features like getting channel list, apps list, executong app, text input, touchpad you can contact me by email.


Usage
=============

There's two files in forder "scripts". First - LG.js describes our module for multiple instances. Second - userMain.js shows how to declare module for specific tv. 

Parameters should look like:

{
        host: 'http://192.168.1.100', //your tv ip
        port: '8080', //port. leave it 8080
        pairKey: '985245'
}

Pair key shows on your tv screen after 'your instance'.sendShowKeyRequest() or you can discover this key by installing native lg application and pairing. 

Before sending keys to TV you should send 'Hello' request. In startUp function module.sendHelloRequest is called but after tv turn off and then on you must send 'Hello' request again.

Next errors may occurs while sending 'Hello': 

1) HTTP/1.1 401 Unauthorized - The pairing key value is not valid.
2) HTTP/1.1 400 Bad Request - The hello request is transmitted in an incorrect format.
3) HTTP/1.1 500 Internal Server Error - During hello request handling, an internal handling error occurs in a Host.
4) HTTP/1.1 503 Service Unavailable - Maximum number of Controllers that a Host can accommodate has been exceeded.


Then after you declare your tv and succesful sending 'Hello' request you can control it by adding JavaScript commands 'your instance'.sendKey('keyName')

List of available commands:

Power,
Number0,
Number1,
Number2,
Number3,
Number4,
Number5,
Number6,
Number7,
Number8,
Number9,
Up,
Down,
Left,
Right,
OK,
HomeMenu,
Menu,
Back,
VolumeUp,
VolumeDown,
Mute,
ChannelUp,
ChannelDown,
Blue,
Green,
Red,
Yellow,
Play,
Pause,
Stop,
FastForward,
Rewind,
SkipForward,
SkipBackward,
Record,
RecordingList,
Repeat,
LiveTV,
EPG,
CurrentInfo,
AspectRation,
ExtInput,
PIPSecondVideo,
Subtitle,
ProgramList,
TeleText,
Mark,
3DVideo,
3DL/R,
Dash,
PreviousChannel,
FavoriteChannel,
QuickMenu,
TextOption,
AudioDescription,
NetCast,
EnergySaving,
A/V_Mode,
SIMPLINK,
Exit,
ReservationProgramList,
PIPChannelUp,
PIPChannelDown,
Primary/Secondary,
MyApps
