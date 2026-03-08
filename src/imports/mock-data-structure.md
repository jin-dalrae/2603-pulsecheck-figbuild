9.1 Mock People Profiles (20 Profiles)
Each profile represents a person the user interacts with during the 7-day prototype period. Profiles should include:
Field
Details
Name
Full name
Photo
Placeholder or AI-generated headshot
Relationship type
Colleague, manager, direct report, friend, partner, family, acquaintance, client
Company / context
Where the user knows them from
LinkedIn headline
Professional context
Instagram handle
Social context (optional, for personal contacts)
Interaction frequency
1x to 10x over the 7-day period

Distribution of interaction frequency across 20 profiles:
2 people: 8–10 interactions (daily contacts — partner, close colleague)
3 people: 5–7 interactions (frequent — manager, team members)
5 people: 3–4 interactions (regular — friends, recurring clients)
5 people: 2 interactions (occasional — acquaintances, infrequent colleagues)
5 people: 1 interaction (one-off — new introduction, rare contact)
9.2 Mock Conversation and Heartbeat Data
Scope: 10 conversations per day × 7 days = 70 total interaction records.
Each interaction record includes:
Interaction ID, date, time, duration (range: 2–45 minutes)
Counterpart ID (linked to one of the 20 profiles)
Full transcript — Realistic, natural dialogue. Minimum 8 turns per conversation. Includes both user and counterpart speech.
Heartbeat slices — 30-second intervals aligned to transcript segments. Each slice has: avg BPM (range 58–120), HRV in ms (range 20–80), speaker label.
Vocal affect markers — Per-sentence annotations for the user's speech: pace (words per minute), relative pitch (baseline = 1.0), volume (baseline = 1.0), pause duration before speaking.
Emotional state label — Per-slice classification: calm, engaged, anxious, frustrated, joyful, sad, defensive, withdrawn.
Trigger flag — Boolean marking slices where the user's biometric data deviated more than 1.5 standard deviations from their personal baseline.
Narrative arcs to include across the 7 days:
Escalating tension — A relationship (e.g., with a manager) that shows progressively higher baseline stress across 5+ interactions over the week, culminating in a difficult conversation on day 6.
Repair arc — A relationship (e.g., with a friend) where an awkward interaction on day 2 leads to avoidance on days 3–4, a candid conversation on day 5, and returning to baseline by day 7.
Consistent calm — A relationship (e.g., with a partner) that shows stable, low-stress interactions throughout, serving as a control and positive reference point.
Real-time save moment — At least 2 interactions where the user's data shows they were heading toward escalation but a pattern break (pause, topic change) redirected the trajectory.
Surprise insight — At least 1 interaction where the user's biometric data tells a different story than the conversation content would suggest (e.g., a "fine" conversation where the user's heart rate stayed elevated throughout).
9.3 Mock Data Format
All mock data should be structured as JSON files, organized as:
/mock-data
  /profiles
    profiles.json          (array of 20 person profiles)
  /interactions
    day1.json              (array of 10 interaction records)
    day2.json
    ...
    day7.json
  /daily-summaries
    day1_summary.json      (daily emotional weather report)
    ...
  /relationship-trends
    trends.json            (weekly trend data per person)
