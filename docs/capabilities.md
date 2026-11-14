# Capabilities (Phase 2) – UE55TU7070, Tizen 5.5

Tested 2026-11-14 from a sideloaded, Samsung-signed web app (`apps/caps`) driven by `tools/logserver.js`.

| Capability | Result | Notes |
|---|---|---|
| Sideloaded app runs, remote keys | PASS | Key codes received; Back = 10009 |
| List installed apps (`tizen.application.getAppsInfo`) | PASS | 302 entries |
| Launch Netflix | PASS | `org.tizen.netflix-app` |
| Launch YouTube | PASS | `9Ur5IzDKqV.TizenYouTube` |
| Launch Prime Video | PASS | `org.tizen.primevideo` |
| Launch Disney+ | PASS | `MCmYXNxgcu.DisneyPlus` |
| Launch RaiPlay | PASS | `5im3FztIhW.RaiTVtizen` |
| Launch NOW | LIKELY | `jcz0WrZYdy.NOWTV`; process starts, success callback not seen. Verify on screen |
| Open Live TV | PASS | `org.tizen.tv-viewer` (also `com.samsung.tv.coba.livetv`) |
| Open Source (input) picker | PASS | `com.samsung.tv.coba.source`; direct HDMI switch not yet tested |
| Load images from LAN HTTP | PASS | PC server on port 8765 reachable from the TV |
| Partner APIs (`b2bapis`) | N/A | Not available (undefined) |
| Other useful IDs | | Photo player `org.tizen.photo-player-tv`, Bluetooth `org.tizen.btapp`, Samsung TV Plus `com.samsung.tv.tvplus`, Rakuten `vbUQClczfR.Wuakitv`, Mediaset Infinity `g3zzYA7yO8.InfinityNew` |

Open: direct HDMI input switching, Bluetooth audio device selection from the app, autorun on boot.
