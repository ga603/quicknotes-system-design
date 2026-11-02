# QuickNotes Architecture

## Requirements
* **Functional:** Users can create, read, and delete plain-text notes.
* **Non-functional:** The system must be highly available (99.9% uptime) and respond in under 200ms.

## Load Estimates (For 1 Million Users)
* **Assumptions:** 1M users, 10% daily active (100k). Each user makes 5 reads and 2 writes per day. Average note is 1KB.
* **Reads per second:** 500k daily reads / 86,400s = ~6 reads/sec.
* **Writes per second:** 200k daily writes / 86,400s = ~2 writes/sec.
* **Storage per year:** 200,000 writes * 1KB * 365 = 73 GB / year.

## Architecture Diagram

```text
[ Client Device ] ---> [ DNS ]
       |
       v
    [ CDN ] ---> (Static Assets: HTML/CSS/JS)
       |
       v
[ Load Balancer ]
       |
  +----+----+
  |         |
[App 1]   [App 2] <---> [ Redis Cache ]
  |         |
  +----+----+
       |
 +-----+------------------+
 |                        |
 v                        v
[ Primary DB ] ---> [ Read Replica DB ]
 (Writes)             (Reads)
 |
 v
[ Message Queue ] ---> [ Worker Server ] (Email Notifications)