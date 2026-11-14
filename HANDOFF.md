# Handoff – status as of 2026-11-14

See `PLAN.md` for the plan. Phase 0 progress:

## Done
- TV: Samsung UE55TU7070UXZT, Tizen 5.5, armv7, profile `tv`, secure_protocol enabled.
- Developer Mode ON; host IP set to the PC that connects (must match the PC's LAN IP; re-set via Apps panel > 12345, then fully power-cycle TV).
- TV LAN IP was 192.168.1.127 (check it hasn't changed). Port 26101 reachable after restart.
- `sdb connect <TV_IP>` works; `sdb shell 0 getduid` returns the DUID needed for the certificate.

## Blocked on the previous machine
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

## Held back
- `20261114_150122(0).jpg` (photo of the TV rear label, shows serial number) is NOT committed because the repo is public.
