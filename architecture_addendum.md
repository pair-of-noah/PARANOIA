🌊 PARANOIA: Architectural Addendum

This document expands upon the core PARANOIA (Pair of Noah) manifesto, detailing the concept of the Universal Client, Deep Packet Inspection (DPI) evasion protocols, and countermeasures against physical device seizure.

I. Universal Interface: Data as LVM

We reject the concept of fragmented applications (messengers, email clients, file managers). Our client on a smartphone or PC is strictly a rendering engine, stripped of any native business logic for interacting with the outside world.

The "LVM for Data" Abstraction: All entities (messages, files, notes) are stored on the Gateway (The Ark) in a single pool. To the client, there is no difference between an email and a Telegram message—it is simply a standardized "block" that it knows how to render according to the rules of a YAML/JSON manifesto.

Asynchrony and the Death of Push Notifications: Modern OSs use interrupts (Push) to control the user's attention. PARANOIA shifts the system to a Pull model. The client remains "silent". The Gateway aggregates information, runs it through LLM filters, and delivers it only when the user decides to initiate a communication session.

No Compromises: If an external corporate service does not provide an open API to connect with the Gateway, in the PARANOIA architecture, that service does not exist. We make no compromises with closed protocols.

II. OPSEC: The Threat of Physical Seizure (Hot Seizure)

The biggest vulnerability of any encrypted system is the human element and the physical seizure of the device in an unlocked state. To protect the "Thin Client", PARANOIA implements the following countermeasures:

1. Dead Man's Switch

The system does not rely on the user having time to lock the device.

Hardware Trigger: The smartphone is hardware-tethered to a wearable device (e.g., a smartwatch via Bluetooth) or a specific trusted local network.

Reaction: Severing the connection with the trigger instantly wipes the session encryption keys from RAM and collapses the tunnel to the Gateway. The device turns into an isolated piece of glass.

2. Plausible Deniability

If the phone is seized and the password is given under duress, a completely empty phone will arouse suspicion.

The client is configured by default to request only safe context from the Gateway (e.g., chat history for the current day or neutral data).

When gaining access to the phone, an adversary sees a "boring" device belonging to an ordinary person. Full access to the data graph is only possible by satisfying additional cryptographic conditions hidden from prying eyes.

3. "Scorched Earth" Protocol (Asynchronous Server-Side Kill Switch)

In scenarios of extreme pressure (threat of physical violence, kidnapping) where adversaries might force the user to surrender all passwords, local measures are insufficient. Protection is shifted to the server side.

Behavioral Triggers and Timers: The Gateway continuously validates the subscriber's security status. If the device is detected outside customary geolocations, the user fails to check in beyond a set time limit (security timer) without initiating a "travel mode" in advance, the distress protocol is triggered. Entering a specific "Duress PIN" upon unlocking the client can also trigger this.

Irrevocable Deletion: Upon triggering, the Gateway physically wipes the cryptographic keys or the critical data graph directly on the server. The seized device loses all value since the data adversaries seek to extract no longer exists anywhere.

III. Transport Layer and Censorship Resistance (DPI/Firewalls)

Deep Packet Inspection (DPI) equipment used by local ISPs can block standard protocols based on signatures and timings. PARANOIA's transport is built on the presumption of a totally hostile network environment and adapts to various levels of blocking.

1. Traffic Masking (Xray / Sing-box / VLESS)

For basic DPI evasion, the base transport is wrapped in masking protocols (Reality / Domain Fronting). All device traffic, intercepted via a local virtual interface (TUN), is encrypted and mimics standard HTTPS requests to allowed websites (e.g., Wikipedia or Microsoft).

2. Manual Route Switching (Occam's Razor)

PARANOIA lacks an automatic server discovery system (Dynamic Discovery/DGA) in the event of IP blocking.

Automation is an attack vector.

If the Gateway's IP address is blocked, the user manually spins up a fallback node from IaC templates (Ansible) and inputs the new IP. No magic — no vulnerabilities.

3. Bypassing "Whitelists": Asynchronous Transport via Legal Services

In a maximum isolation scenario (Default Deny), where all unknown IPs (including Tor and Mesh networks) are blocked, direct communication with the Gateway becomes impossible. PARANOIA switches to using "borrowed infrastructure" (Dead drop):

Email Bridge (SMTP/IMAP): Data is encapsulated into encrypted PGP/Age containers and forwarded as standard emails (or saved in drafts) on public email services that are on the state's "whitelist". The Gateway and Client poll the inbox asynchronously.

S3 Buckets: The Client reads and writes encrypted binary data blocks to public S3 storages of trusted providers (AWS, Yandex Cloud, etc.).

Architectural Profit: The traffic looks like standard corporate email synchronization or backups to a legal cloud. Blocking such services breaks the region's business infrastructure, so they remain accessible. Direct "Client-Gateway" connection is absent — they communicate exclusively through the legal provider's buffer zone.

4. Darknet Fallback and Mesh

For scenarios where the internet has not yet transitioned to a "Whitelist" mode but direct connections are strictly filtered:

Tor Hidden Services: The Gateway is hosted as an .onion address. All communication goes through onion routing.

Custom Mesh Protocols: Utilizing P2P overlay networks with NAT traversal to create hidden tunnels.

5. Hardware Air Gap (Optional)

For the paranoid mode, an external micro-router is used. The smartphone is stripped of its SIM card and connects to the router via Wi-Fi. The router has a hardware Kill Switch and is strictly tethered to the Gateway. The smartphone is physically incapable of accessing the internet outside the secure channel.
