# 🌊 PARANOIA (Pair of Noah)

### Pair-o'-Nodes · A Personal Digital Sovereignty Project

> **"The smartphone knows the address of a single server. Nothing more."**

**PARANOIA** (or *Pair of Noah*) is an architectural manifesto and an upcoming toolkit for building a personal digital Ark. It is a zero-trust, two-node ecosystem designed to strip modern smartphones of their autonomy and turn them into "thin clients" routed through a self-hosted, heavily fortified gateway.

## 📖 Table of Contents

1. [The Manifesto](https://www.google.com/search?q=%23i-the-manifesto "null")
  
2. [The Ark Architecture](https://www.google.com/search?q=%23ii-the-ark-architecture "null")
  
3. [The Software Map](https://www.google.com/search?q=%23iii-the-software-map "null")
  
4. [Secrets Management](https://www.google.com/search?q=%23iv-secrets-management "null")
  
5. [Roadmap](https://www.google.com/search?q=%23v-roadmap "null")
  
6. [Contact & Community](https://www.google.com/search?q=%23vi-contact--community "null")
  

## I. The Manifesto

We live inside an infrastructure owned by others. Every application on your smartphone is not a tool; it is a corporate agent. It collects data, builds profiles, and fuels the attention economy. We do not pay for services with money—we pay with ourselves.

**Paranoia is not fear. It is the conscious architectural choice of your own digital life.**

### 🛑 Three Axioms

1. **Zero Trust by Default.** Any app, service, or protocol is guilty until proven innocent. Access is granted surgically, consciously, and with a clear understanding of *why*.
  
2. **Understand Every Byte.** You must understand every outgoing request. What, where, and why. Black boxes are unacceptable.
  
3. **Ephemerality as a Principle.** Any infrastructure component can be destroyed and rebuilt in minutes. There are no irreplaceable nodes.
  

### ⚙️ Three Implementation Principles

- **The Principle of Substitution:** Replace, do not just reject. For every corporate service, there is an open-source alternative inside the personal perimeter.
  
- **The Principle of Transparency:** Absolute traffic transparency. Whitelist-only DNS. All traffic routes through a personal gateway.
  
- **The Principle of Secrets:** Deterministic secrets. No keys are stored anywhere. Everything is restored from a single mnemonic phrase using a deterministic derivation algorithm.
  

## II. The Ark Architecture

The smartphone only knows one address. Everything else is inside.

### The Flow

```
[ User ]
   ↓
[ Smartphone (Thin Client) ] → Knows ONLY: the address of the personal gateway
   ↓ (Encrypted WireGuard / Xray Tunnel)
[ Personal Gateway (The Ark) ] → The single exit point to the Internet
   ↓ (Whitelist DNS, Traffic Classification)
[ Internal Backend Services ] → Custom LLM Gateway, Media, Files, Email, Messenger Bus
   ↓ (Only when necessary, anonymously, on behalf of the server)
[ The Public Internet ]
```

## III. The Software Map

### 🧱 Ready-Made (Mature Open Source)

We use established open-source tools where building from scratch is unnecessary.

| **Task** | **Solution** |
| --- | --- |
| **DNS Filtering** | AdGuard Home / Pi-hole (Whitelist-only) |
| **Tunneling** | WireGuard + Xray / Sing-box |
| **Email Bus** | Postfix (MTA) + Dovecot (MDA) |
| **Media Server** | Jellyfin (Video streamed locally, bypassing YouTube tracking) |
| **Search** | SearXNG (Meta-search engine, hides device fingerprint) |
| **Navigation** | OsmAnd (Offline maps, zero tracking) |
| **Passwords & Files** | Vaultwarden & Nextcloud |
| **IaC** | Ansible + Terraform (Ephemeral infrastructure) |

### 🛠 Custom-Built (The Thin Glue)

Custom development is strictly limited to areas where existing solutions break trust or architecture.

- **Messenger Core:** Custom CLE Protocol. E2E Crypto layer built on libsodium/Age.
  
- **Transport Adapters:** IMAP/S3 adapters. The messenger has no concept of sockets—it only passes encrypted containers.
  
- **LLM Gateway:** Intercepts encrypted requests → strips metadata → calls public API (OpenAI/Anthropic) from the server's IP → returns the answer.
  
- **Key Derivation CLI:** BIP39 Seed → Argon2id → Deterministic keys for SSH, Age, GPG, WireGuard.
  

## IV. Secrets Management

**Fundamental Rule: No keys are stored anywhere. Everything is derived deterministically.**

### Key Derivation Tree

```
[BIP39 Seed Phrase (24 words)]
   ↓ Argon2id (Salt = "paranoia-master")
[Master Seed]
   ├── Path: paranoia/ssh/0  → Ed25519    → SSH Key (Gateway)
   ├── Path: paranoia/age/0  → X25519     → Age Key (SOPS / Configs)
   ├── Path: paranoia/gpg/0  → Ed25519    → GPG Key (E2E Email Bus)
   └── Path: paranoia/wg/0   → Curve25519 → WireGuard Key
```

## V. Roadmap

- [ ] **Phase 1: Infrastructure** - Gateway on VPS/Proxmox, WireGuard tunnel, AdGuard Home (Whitelist-only).
  
- [ ] **Phase 2: Transport** - CLE container specs, IMAP/S3 adapters, Key Derivation CLI.
  
- [ ] **Phase 3: Services** - LLM Gateway, Jellyfin + yt-dlp, SearXNG routing.
  
- [ ] **Phase 4: Product** - Ansible playbooks for one-click deployment, documentation for non-technical users.
  

## VI. Contact & Community

We are building a community of network engineers, privacy advocates, and developers who refuse to pay with their data.

📫 **Get in touch:** `pairofnoah@gmail.com`

*If you are interested in contributing to the Ansible playbooks, the Key Derivation CLI, or the CLE protocol, feel free to open an issue or drop an email.*
