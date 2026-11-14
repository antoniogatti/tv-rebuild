# Handoff – status as of 2026-11-14

See `PLAN.md` for the plan. Phase 0 progress:

## Done
- TV: Samsung UE55TU7070UXZT, Tizen 5.5, armv7, profile `tv`, secure_protocol enabled.
- Developer Mode ON; host IP set to the PC that connects (must match the PC's LAN IP; re-set via Apps panel > 12345, then fully power-cycle TV).
- TV LAN IP was 192.168.1.127 (check it hasn't changed). Port 26101 reachable after restart.
- `sdb connect <TV_IP>` works; `sdb shell 0 getduid` returns the DUID needed for the certificate.

## Update 2026-11-14 (new PC, 192.168.1.129): Phase 0 DONE
- Tizen Studio, Java 8, Certificate Manager and Samsung extensions installed; signing profile `NEWNEW` (Samsung, DUID KLCOKRTY3K7PU).
- `apps\hello` builds, signs and runs on the TV. Package ID must be exactly 10 chars.
- Deploy: `sdb connect 192.168.1.127`, then from `apps\hello`: `tizen build-web -- .`, `tizen package -t wgt -s NEWNEW -- .buildResult`, `tizen install -n Hello.wgt -t UE55TU7070UXZT -- .buildResult`, `tizen run -p TvRebHello.Hello -t UE55TU7070UXZT`.
- Next: Phase 2 of PLAN.md.

## Blocked on the previous machine (resolved)
- Tizen Studio CLI installer works, but `package-manager-cli install/update` always fails
  ("Cannot install the Tizen Studio package", exit 4) and wipes `tools\ide`. Cause not found
  (Avanade-managed laptop suspected). Could not install the Samsung Certificate Extension.
- Needs Java 8 (Temurin 8) for the package manager; Java 17 fails with a JAXB error.

## Next steps (new machine)
1. Install Tizen Studio (IDE installer is fine), then in Package Manager install
   **TV Extensions** and **Samsung Certificate Extension**.
2. Set the TV's Developer Mode host IP to the new machine's IP, power-cycle the TV.
3. `sdb connect <TV_IP>`, then `sdb -s <TV_IP>:26101 shell 0 getduid`.
4. Certificate Manager: create a Samsung certificate (Samsung account login) for that DUID.
5. Build and deploy a hello-world .wgt; then continue with Phase 2 of PLAN.md.

## Photo
- `20261114_150122(0).jpg` is the TV rear-label photo (model, serial). Committed on request.

## Update: Phase 2 done, Phase 3 started
- Results in docs\capabilities.md. Hub v0.1 in apps\hub (config.json drives tiles; deploy like apps\hello, package TvRebuHub0.Hub).
- Open: NOW launch check, direct HDMI switch, Bluetooth, autorun, UI design/photos background.
