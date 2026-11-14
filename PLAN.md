# TV Rebuild – Plan (Samsung UE55TU7070, Tizen only)

Scope: Samsung TV only (no Fire TV / external boxes).
Goal: clean, usable, personalised TV. Keep Italian live TV, input switching, Bluetooth audio,
Disney+, YouTube, Netflix, Prime Video, NOW, RaiPlay; family photos (specific albums); phone/PC casting.
Nice to have: reusable on other (Samsung/Tizen) TVs.

## Facts established
- Tizen is signed/locked: the Samsung software cannot be replaced. Android-TV tools (tv-detox, Claude-TV) do not apply.
- Only extension point: sideloaded Tizen web app (HTML/JS/.wgt) via Developer Mode + Tizen Studio + Samsung developer account.
- Certificate is per TV and expires (~1 year); turning Dev Mode off removes sideloaded apps. Dev Mode option may be hidden on some firmware.
- Google Photos Library API (since 2025-03-31) reads only app-created media; Picker API is manual. Use a synced folder/NAS instead.
- Casting: AirPlay 2 / Smart View / DLNA native; no Chromecast. Android -> Smart View/Miracast is the path (to verify).

## Phase 0 – Verification gate
1. Settings > Support > About This TV: record Tizen/firmware version.
2. Check Developer Mode is available (Apps panel, enter 12345). Record result.
3. Confirm in Samsung app store: Disney+, YouTube, Netflix, Prime Video, NOW, RaiPlay. Record any missing.
4. Install Tizen Studio + Samsung Certificate Extension; create certificate for this TV; deploy a hello-world .wgt.
Exit: hello-world runs on the TV. If Dev Mode is unavailable -> fall back to "settings-only cleanup" (Phase 1) and stop.

## Phase 1 – Samsung settings cleanup (no sideloading needed)
- Turn off autorun/promotions/personalised ads; remove/reorder apps; pin the six apps first.
- Document before/after in `docs/`.

## Phase 2 – Capability prototype (decides scope of hub app)
Test from a sideloaded app, one by one, and record pass/fail:
- Launch each of the six apps (tizen.application.launch with their app IDs – look up/verify each ID on the TV).
- Switch HDMI input / open Live TV (may be partner-restricted).
- Read local-network images (HTTP) and play a slideshow.
- Remote key handling (arrows/OK/Back).
Result table goes in `docs/capabilities.md`.

## Phase 3 – Hub app
- Web app: dock with app tiles, input/live-TV shortcuts if allowed, clock, photo background.
- Configuration in a single JSON file (apps, order, photo URL) so it can be re-signed/deployed to other Tizen TVs.
- UI based on public design references; send me screenshots from Mobbin (login-gated).
- Autorun on boot if the TV setting permits; otherwise first slot in Apps.

## Phase 4 – Photos
- Chosen albums synced to a PC folder/NAS (Takeout or manual download; check ToS), served over HTTP on the LAN.
- Hub app reads a generated `photos.json` index.

## Phase 5 – Casting
- Android -> Smart View / Miracast test; PC (Windows) -> Win+K or Smart View test. Record results.

## Phase 6 – Maintenance & portability
- Script (PowerShell) for build/sign/deploy; calendar reminder for certificate renewal.

## Open items
- Tizen/firmware version and Dev Mode availability (gating).
- Where photos will live (PC, NAS).
