# HopprTIF — Unified TV Input Framework Module

> **HopprTIF** turns Android’s native TV Input Framework (TIF) into a unified event system that streams structured `SystemEvent`s into Hoppr analytics, automation, and runtime trigger pipelines.

---

## 🧭 Overview

| Feature | Description |
|----------|--------------|
| **Modes** | `QUERY` (one-shot), `LISTEN` (reactive), `POLLING` (scheduled) |
| **Targets** | Android TIF tables — `TvContract.Channels`, `TvContract.Programs` |
| **Output** | `SystemEvent(name, type, payload)` |
| **Event Types** | `INFO`, `ANALYTICS`, `TRIGGER` |
| **Purpose** | Capture live EPG data, program changes, and analytics snapshots in real time. |

---

## 🧱 Project Structure

```
hopprtif/
 ├── build.gradle
 ├── AndroidManifest.xml
 ├── core/
 ├── data/
 ├── model/
 ├── util/
 └── assets/
```

---

## ⚙️ Installation

```gradle
implementation project(':hopprtif')
```

Permissions:
```xml
<uses-permission android:name="android.permission.READ_TV_LISTINGS" />
<uses-permission android:name="com.android.providers.tv.permission.READ_EPG_DATA" />
<uses-permission android:name="com.android.providers.tv.permission.ACCESS_ALL_EPG_DATA" />
<uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" />
```

---

## ⚡ Quick Start

```kotlin
val rules = ConfigLoader.load(assets.open("tif_config.json"))
val engine = TifEngine(this) { event ->
    when (event.type) {
        EventType.INFO -> Log.i("HopprTIF", "INFO: ${event.name}")
        EventType.ANALYTICS -> AnalyticsManager.log(event.name, event.payload)
        EventType.TRIGGER -> TriggerEngine.fire(event.name)
    }
}
engine.start(rules)
```

---

## 🧩 Config File Example

```json
{
  "rules": [
    {
      "id": "channels.snapshot",
      "mode": "QUERY",
      "table": "CHANNELS",
      "eventType": "INFO"
    },
    {
      "id": "planetearth.listener",
      "mode": "LISTEN",
      "table": "PROGRAMS",
      "filters": { "titleContains": "Planet Earth II" },
      "eventType": "TRIGGER",
      "diffKeys": ["title","channelId","start_time_utc_millis"]
    },
    {
      "id": "programs.poller",
      "mode": "POLLING",
      "table": "PROGRAMS",
      "intervalMs": 60000,
      "eventType": "ANALYTICS",
      "diffKeys": ["title","channelId"]
    }
  ]
}
```

---

## 🧠 Modes Explained

| Mode | Frequency | Diffing | Typical Use |
|------|------------|---------|--------------|
| **QUERY** | One-shot | ❌ | Fetch snapshot on demand |
| **LISTEN** | Continuous | ✅ | React to live data changes |
| **POLLING** | Interval | ✅ | OEM fallback or analytics loop |

---

## 🧠 Example On-Demand Query

```kotlin
val rule = Rule(
    id = "channels.manual",
    mode = "QUERY",
    table = "CHANNELS",
    eventType = EventType.INFO,
    filters = mapOf("browsable" to "1"),
    includePayload = true
)

QueryManager.runOnce(context, rule) { event ->
    Log.i("HopprTIF", "Found ${event.payload["count"]} channels")
}
```

---

## 🧾 License

Copyright © 2025 **Hoppr Technologies**
