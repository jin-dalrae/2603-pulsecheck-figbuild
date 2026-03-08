5. The Three Core Features
Feature 1: Reflect — Post-Interaction Emotional Report
Purpose: After an interaction ends, give the user a rich, honest mirror of their emotional state throughout the conversation.
How it works:
When the glass detects that a conversation has ended (voice activity drops, user moves away, or manually triggered), Pulse generates an interaction report.
The report is delivered to the companion app (phone) as a card that the user can review at their convenience — not pushed intrusively.
Report contents:
Emotional arc timeline — A visualization of the user's emotional state across the conversation, plotted against heartbeat data and conversational segments. Shows rising tension, calm stretches, emotional spikes.
Trigger moments — Specific sentences or topics (from the transcript) that correlated with the user's strongest physiological responses. Framed as: "Your heart rate increased 15 BPM after the topic of project deadlines came up."
Voice analysis summary — How the user's vocal patterns shifted: pace, pitch, volume, pause frequency. "You spoke 25% faster in the second half of the conversation and your average pitch rose."
Emotional residue check-in — 30 minutes after the interaction, a gentle prompt: "How are you feeling now about your conversation with Alex?" This self-report is layered with the continued biometric data to show whether the user has physiologically returned to baseline.
General state snapshot — Aggregated across all interactions that day, this gives a daily emotional weather report: "Today you had 6 interactions. Your calmest was with Jordan. Your most activated was the team standup."
Feature 2: Track — Relationship Pattern Dashboard
Purpose: Over time, surface patterns in how the user emotionally responds to specific people, and help them reflect on what those patterns mean.
How it works:
Pulse identifies counterparts via facial recognition (vision data from the glass) and links them to profiles via LinkedIn, Instagram, contacts, or manual tagging.
Each person the user interacts with gets a relationship card that accumulates data over time.
Dashboard contents:
Person profile — Photo, name, relationship context (colleague, friend, partner, etc.), pulled from linked APIs.
Interaction history — List of recent conversations with emotional arc thumbnails. "You've spoken with Marcus 7 times this week. Average emotional intensity: moderate-high."
Trend lines — How the user's baseline emotional state before, during, and after interactions with this person has shifted over days/weeks. "Your pre-meeting anxiety before calls with Sarah has been steadily increasing."
Relational insights — AI-generated observations, always framed around the user: "You tend to speak more quickly and use fewer pauses when talking with David, which correlates with your reported feelings of being unheard."
Preparation prompts — Before a scheduled interaction (via calendar integration) with someone the user has tension history with: "You're meeting with Lisa in 30 minutes. In your last 3 conversations, your heart rate averaged 95 BPM (your resting is 68). Would you like to do a 2-minute breathing exercise first?"
Feature 3: Guide — Real-Time In-Glass Nudges
Purpose: During a live interaction, give the user subtle, non-intrusive feedback through the glass HUD when their biometric signals indicate they're approaching an emotional threshold they've pre-defined.
How it works:
Users set personal thresholds and preferences during onboarding: "Alert me when my heart rate exceeds 100 BPM for more than 30 seconds during a conversation" or "Nudge me if my voice pace increases more than 40% above my baseline."
During a conversation, Pulse continuously monitors and, when a threshold is crossed, delivers a minimal visual cue on the glass.
Nudge types:
Awareness nudge — A small, subtle glow or icon at the edge of the user's field of view. No text. Just a gentle "you're activated right now" signal. Color-coded: amber for elevated, red for high.
Breath prompt — A brief text overlay: "Breathe." Appears for 3 seconds and fades. Triggered when HRV drops below the user's stress threshold.
Pause suggestion — "You might want to pause." Triggered when both heart rate and vocal pace have been elevated for a sustained period, suggesting escalation.
Exit prompt — "Consider stepping away." Only triggered at the highest threshold, when biometric signals indicate the user is in a state where productive conversation is unlikely. This is the user's own pre-set "pull me out" signal.
Critical design constraint: All nudges must be invisible to the counterpart. No sounds, no visible screen changes from the outside. The glass HUD is private to the wearer.