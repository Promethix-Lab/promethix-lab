# 🌐 The Simple, In-Depth Guide to DNS, Email Security (SPF/DKIM), and Cloudflare

Welcome! This guide is designed to explain how DNS, email verification (SPF/DKIM), and Cloudflare work in simple, plain English, with detailed examples and command-line tools you can use.

---

## 1. What is DNS? (The Phonebook of the Internet)

When you want to visit a website, you type a friendly name like `promethixlab.com` into your browser. However, computers don't understand names—they communicate using numbers called **IP addresses** (like `192.0.2.1` or `2606:4700:3030::6815:ac7e`).

The **Domain Name System (DNS)** is the translator. It looks up the name you typed and returns the correct IP address so your browser knows where to go.

### How DNS Propagation Works
When you add or edit a record at your DNS provider (e.g., Cloudflare, Namecheap, GoDaddy):
1. **The Update:** Your DNS provider updates its servers.
2. **Caching:** To keep the internet fast, other DNS servers around the world (like Google's `8.8.8.8` or your local internet provider's servers) "save" (cache) DNS records.
3. **Propagation:** When you change a record, it takes time for those cached copies around the world to expire and fetch your new record. This delay is called **DNS Propagation** and typically takes anywhere from 5 minutes to 24–48 hours.

---

## 2. Common Types of DNS Records

In your DNS dashboard, you will manage a table of records. Here are the most important ones:

### 🅰️ A Records (Address Records)
* **What it does:** Directly maps a domain or subdomain to an **IPv4 address** (a 32-bit number like `104.21.9.120`).
* **Example:**
  * Host/Name: `@` (representing `promethixlab.com`)
  * Type: `A`
  * Value: `104.21.9.120`

### 🔗 CNAME Records (Canonical Name Records)
* **What it does:** Creates an **alias** pointing one domain name to another domain name. It does NOT point to an IP address.
* **Why it's useful:** If your backend server's IP address changes, you only have to update it in one place (the A record). All CNAMEs pointing to it will automatically update.
* **Example:**
  * Host/Name: `www` (representing `www.promethixlab.com`)
  * Type: `CNAME`
  * Value: `promethixlab.com`

### 📧 MX Records (Mail Exchanger Records)
* **What it does:** Tells sending email servers **where to deliver incoming emails** sent to your domain (e.g., if someone emails `info@promethixlab.com`).
* **Example:**
  * Host/Name: `@`
  * Type: `MX`
  * Value: `mail.protonmail.ch` (Priority: `10`)

### 📝 TXT Records (Text Records)
* **What it does:** Allows domain owners to store arbitrary text. While initially meant for human notes, today it is heavily used for domain verification and security settings (like SPF).
* **Example:**
  * Host/Name: `@`
  * Type: `TXT`
  * Value: `google-site-verification=AbCdEfGh123456`

---

## 3. Email Security: SPF and DKIM

Spam and phishing are major problems because standard email protocols don't verify who is sending the message. Anyone can write a script to send an email claiming to be from `ceo@promethixlab.com`. 

To prevent this, two security systems are configured in your DNS: **SPF** and **DKIM**.

### 🛡️ SPF (Sender Policy Framework)
* **How it works:** You publish a list of authorized sending IP addresses or services in a **TXT record**.
* **Analogy:** Like a guest list at a private club. If your name (sending IP) isn't on the list, the bouncer (receiving email provider like Gmail) throws your email into the spam folder.
* **Example SPF Record:**
  `v=spf1 include:mail.loops.so ~all`
  * `v=spf1`: Identifies this as an SPF record.
  * `include:mail.loops.so`: Tells receivers that emails sent from Loops' servers are allowed.
  * `~all`: Means "soft fail" (if it's not sent from Loops, accept it but flag it/mark it with caution).

### 🔑 DKIM (DomainKeys Identified Mail)
* **How it works:** It adds a **cryptographic digital signature** to the header of every outgoing email.
* **The Keys:** 
  * Your email sender (like Loops or Amazon SES) holds a **Private Key** and signs the emails before sending them.
  * You publish a **Public Key** in your DNS as a **CNAME record**.
* **Verification:** The receiving server (like Gmail) fetches your public key from your DNS CNAME, decrypts the signature, and verifies that the email was actually sent by you and was not tampered with during transit.
* **Why there are 3 CNAMEs:** Amazon SES (which Loops and Resend use under the hood) uses "Easy DKIM," which provides three CNAME records to facilitate key rotation (automatically switching keys periodically for security).

---

## 4. Cloudflare: Proxied vs. DNS Only

Cloudflare provides two modes for DNS records:

```text
[ Visitor ] ➔ [ Cloudflare (Proxy) ] ➔ [ Your Server ]   <-- PROXIED (Orange Cloud)
[ Visitor ] ➔ [ Your Server directly ]                    <-- DNS ONLY (Grey Cloud)
```

### 🟠 Proxied (Orange Cloud)
* **What it does:** Cloudflare acts as an intermediary. Visitors query your domain, and Cloudflare returns its own IP address. The traffic goes through Cloudflare's servers, which handles SSL certificates, caches static assets, and blocks hackers.
* **When to use:** For your main website (`A` record pointing to your server, or `CNAME` pointing to Vercel/Render).

### ⚪ DNS Only (Grey Cloud)
* **What it does:** Cloudflare acts as a standard DNS provider, returning the exact destination value directly to the query.
* **When to use:** **Always** use this for verification and routing records (MX, SPF, DKIM CNAMEs).
* **Why it's crucial:** If you set a DKIM CNAME to "Proxied", Cloudflare will return a Cloudflare IP instead of pointing to `dkim.amazonses.com`. The email receiver won't be able to fetch the cryptographic key, and your emails will fail verification.

---

## 5. Command-Line DNS Tools: The `dig` Command

`dig` (Domain Information Groper) is the industry-standard tool for testing DNS records. Here is how to understand its output:

### Anatomy of a `dig` Command
If you run:
```bash
dig CNAME adhfdusnlrqqipv3rea6opxnwrhvkgsj._domainkey.promethixlab.com
```

The most important part of the output is the **ANSWER SECTION**:
```text
;; ANSWER SECTION:
adhfdusnlrqqipv3rea6opxnwrhvkgsj._domainkey.promethixlab.com. 300 IN CNAME adhfdusnlrqqipv3rea6opxnwrhvkgsj.dkim.amazonses.com.
```

* **`300`**: This is the **TTL (Time to Live)** in seconds. It tells resolvers to save (cache) this answer for 5 minutes (300 seconds) before asking again.
* **`IN`**: Internet class.
* **`CNAME`**: The type of record found.
* **`adhfdusnlrqqipv3rea6opxnwrhvkgsj.dkim.amazonses.com.`**: The destination target.

### Testing Specific Public Servers
If a record resolves locally but a platform says it can't find it, query public resolvers directly:

```bash
# Query Google's Public DNS (8.8.8.8)
dig CNAME <subdomain> @8.8.8.8

# Query Cloudflare's Public DNS (1.1.1.1)
dig CNAME <subdomain> @1.1.1.1
```
