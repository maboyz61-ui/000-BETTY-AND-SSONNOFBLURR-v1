import React, { useState } from 'react';
import { Calendar, MapPin, Ticket, Check, Sparkles, ThumbsUp, Radio, AlertTriangle, X } from 'lucide-react';
import { TourDate } from '../types';

interface TourDatesProps {
  tourDates: TourDate[];
}

export const TourDates: React.FC<TourDatesProps> = ({ tourDates }) => {
  const [dates, setDates] = useState<TourDate[]>(tourDates);
  const [selectedEvent, setSelectedEvent] = useState<TourDate | null>(null);
  const [ticketTier, setTicketTier] = useState<string>('Quadraphonic Soundstage');
  const [passcodeGenerated, setPasscodeGenerated] = useState<string | null>(null);
  const [votes, setVotes] = useState<{ [trackName: string]: number }>({
    'Echoes in the Mirage (Extended Sub Mix)': 1420,
    'Blur Silhouette 000 (Live Breakbeat Acid)': 2150,
    'Midnight Violet Tape (Tape Drone Solo)': 980,
    'Neon Static Cathedral (Full Organ Climax)': 1870,
  });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const randomPass = `BLUR-${selectedEvent.city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setPasscodeGenerated(randomPass);

    // Increment RSVP count
    setDates(prev => prev.map(d => d.id === selectedEvent.id ? { ...d, rsvpCount: d.rsvpCount + 1 } : d));
  };

  const handleVote = (track: string) => {
    if (userVoted) return;
    setUserVoted(track);
    setVotes(prev => ({
      ...prev,
      [track]: (prev[track] || 0) + 1
    }));
  };

  return (
    <div className="space-y-10 pb-24">
      {/* Header */}
      <div className="border-b border-purple-500/20 pb-6">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
          <Calendar className="h-4 w-4" />
          <span>QUADRAPHONIC SOUND SYSTEM TOUR 2026/2027</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
          LIVE DATES & TRANSMISSIONS
        </h2>
        <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
          Betty and Son of Blur perform live using 4-channel surround modular synthesizers, synchronized strobe arrays, and direct reel tape saturation.
        </p>
      </div>

      {/* Tour Dates List */}
      <div className="space-y-4">
        {dates.map((event) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-neutral-900/60 p-5 sm:p-6 backdrop-blur-xl hover:border-purple-500/40 hover:bg-neutral-900/90 transition-all shadow-md group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Date Box */}
              <div className="flex h-16 w-32 flex-col justify-center rounded-xl bg-purple-950/60 border border-purple-500/30 px-3 text-center">
                <span className="font-mono text-xs font-bold text-purple-300">
                  {event.date.split(',')[0]}
                </span>
                <span className="font-display text-sm font-extrabold text-white">
                  {event.date.split(',')[1]}
                </span>
              </div>

              {/* Venue & Location */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {event.city}, {event.country}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                      event.status === 'Sold Out'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        : event.status === 'Selling Fast'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-purple-400" />
                    {event.venue}
                  </span>
                  <span>•</span>
                  <span>{event.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Action & RSVP Count */}
            <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
              <span className="font-mono text-xs text-neutral-400">
                {event.rsvpCount.toLocaleString()} ATTENDEES RSVP'D
              </span>

              <button
                disabled={event.status === 'Sold Out'}
                onClick={() => {
                  setSelectedEvent(event);
                  setPasscodeGenerated(null);
                }}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-mono font-bold transition-all ${
                  event.status === 'Sold Out'
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                }`}
              >
                <Ticket className="h-4 w-4" />
                <span>{event.status === 'Sold Out' ? 'WAITLIST ONLY' : 'RESERVE PASS'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Setlist Voting Poll */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-neutral-900/60 to-black p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
          <Sparkles className="h-4 w-4" />
          <span>CROWD-SOURCED MODULAR SETLIST</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-white">
          VOTE: WHAT EXTENDED DUB SHOULD WE PLAY IN THE ENCORE?
        </h3>
        <p className="text-xs text-neutral-400 font-mono mt-1 mb-6">
          The highest-voted audio stem mix will be patched into the modular synthesizer during the encore.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(votes).map(([trackName, count]) => {
            const isVoted = userVoted === trackName;
            return (
              <div
                key={trackName}
                className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-black/40 hover:border-purple-500/30 transition-all"
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-neutral-200">{trackName}</h4>
                  <span className="font-mono text-xs text-purple-400">{count.toLocaleString()} votes</span>
                </div>
                <button
                  onClick={() => handleVote(trackName)}
                  disabled={!!userVoted}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold transition-all ${
                    isVoted
                      ? 'bg-emerald-600 text-white'
                      : userVoted
                      ? 'bg-neutral-800 text-neutral-500'
                      : 'bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30'
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{isVoted ? 'VOTED' : 'VOTE'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ticket Reservation Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-md w-full rounded-3xl border border-purple-500/40 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 rounded-full p-2 bg-neutral-900 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {!passcodeGenerated ? (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                  <Ticket className="h-4 w-4" />
                  <span>DIGITAL PASS REGISTRATION</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedEvent.city} Live Date
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {selectedEvent.venue} • {selectedEvent.date}
                </p>

                <div className="pt-2">
                  <label className="block text-xs font-mono text-neutral-300 mb-2">
                    SELECT AUDIO-VISUAL TIER
                  </label>
                  <div className="space-y-2">
                    {[
                      { tier: 'Quadraphonic Soundstage', price: '€42', desc: 'Direct access to center quadraphonic speaker array' },
                      { tier: 'Studio Tape Pass', price: '€68', desc: 'Includes C-60 cassette dub & early entry' },
                      { tier: 'VIP Archival Package', price: '€110', desc: 'Signed 2xLP Vinyl, front rail, meet Betty & Son of Blur' }
                    ].map((item) => (
                      <div
                        key={item.tier}
                        onClick={() => setTicketTier(item.tier)}
                        className={`cursor-pointer rounded-xl border p-3 flex justify-between items-center transition-all ${
                          ticketTier === item.tier
                            ? 'border-purple-500 bg-purple-950/40 text-white'
                            : 'border-white/5 bg-neutral-900 text-neutral-400 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <p className="font-display font-bold text-xs text-neutral-200">{item.tier}</p>
                          <p className="text-[10px] text-neutral-400">{item.desc}</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-purple-300">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-3 text-xs font-mono font-bold text-white shadow-lg shadow-purple-600/30 transition-all"
                  >
                    GENERATE CONFIRMED DIGITAL PASS
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  PASS CONFIRMED
                </h3>
                <p className="text-xs text-neutral-300">
                  Your entry credentials have been logged in the 000-BETTY transmission registry.
                </p>
                <div className="rounded-2xl border border-purple-500/40 bg-purple-950/40 p-4 font-mono">
                  <span className="text-[10px] text-neutral-400 block">DIGITAL PASS CODE</span>
                  <span className="text-lg font-bold text-purple-300 tracking-widest">{passcodeGenerated}</span>
                  <span className="text-[10px] text-neutral-400 block mt-1">Tier: {ticketTier}</span>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full rounded-xl bg-neutral-800 hover:bg-neutral-700 py-2.5 text-xs font-mono text-neutral-200 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
