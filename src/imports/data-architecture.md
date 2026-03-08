6. Data Architecture and Input Streams
6.1 Input Data Sources
Source
Data Type
Capture Method
Purpose
Voice (User)
Audio waveform, transcript
Glass microphone, on-device STT
Vocal affect analysis, conversation content
Voice (Counterpart)
Audio waveform, transcript
Glass microphone, on-device STT
Context for user's reactions (what triggered them)
Vision
Facial recognition data
Glass camera, on-device processing
Identify counterpart, link to profile
Heartbeat
BPM, HRV
Glass-integrated PPG sensor
Physiological arousal, stress/calm detection
API (LinkedIn)
Professional profile, role, company
OAuth-linked API call
Counterpart context for professional interactions
API (Instagram)
Social profile, mutual connections
OAuth-linked API call
Counterpart context for personal interactions
API (Contacts)
Name, phone, relationship label
Device contacts access
Counterpart identification and labeling
Calendar
Upcoming meetings, attendees
Google/Outlook calendar API
Pre-interaction preparation prompts

6.2 Data Processing Pipeline
On-glass — Raw audio and heartbeat captured locally. Voice-to-text runs on-device. Facial recognition runs on-device. No raw audio or video leaves the glass.
Edge processing (phone) — Transcript + HRV data synced to companion app. Vocal affect analysis and emotional arc computation happen here.
Cloud (optional) — Longitudinal pattern analysis, relationship trend computation, and AI insight generation. All data encrypted at rest and in transit. User can opt for fully local processing with reduced feature set.
6.3 Heartbeat Data Structure
Heartbeat data is captured as a continuous stream and sliced against conversation timestamps:
{
  "interaction_id": "int_20260306_001",
  "user_id": "user_001",
  "counterpart_id": "person_marcus_chen",
  "timestamp_start": "2026-03-06T09:00:00Z",
  "timestamp_end": "2026-03-06T09:22:14Z",
  "heartbeat_slices": [
    {
      "slice_start": "09:00:00",
      "slice_end": "09:00:30",
      "avg_bpm": 72,
      "hrv_ms": 48,
      "transcript_segment": "Hey Marcus, thanks for making time.",
      "speaker": "user"
    },
    {
      "slice_start": "09:00:30",
      "slice_end": "09:01:00",
      "avg_bpm": 74,
      "hrv_ms": 45,
      "transcript_segment": "Sure, I wanted to talk about the timeline change.",
      "speaker": "counterpart"
    }
  ]
}
Each slice is 30 seconds, containing: average BPM, HRV in milliseconds, the corresponding transcript segment, and speaker identification.
