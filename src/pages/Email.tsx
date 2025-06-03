import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const emailCards = [
  {
    participants: ['Ali', 'Saeed', 'Usman', 'Faisal'],
    summary: "Discussed project milestones, assigned tasks for next sprint, and reviewed last week's blockers. Action items: Ali to prepare the next report, Saeed to follow up with vendor.",
    date: '2025-07-01',
    time: '10:00 AM',
  },
  {
    participants: ['Ali', 'Saeed', 'Usman', 'Faisal'],
    summary: "Reviewed budget allocations and risk register. Noted overspending in hardware, discussed mitigation for delayed content delivery. Next meeting to finalize Q3 plan.",
    date: '2025-07-02',
    time: '2:30 PM',
  },
  {
    participants: ['Ali', 'Saeed', 'Usman', 'Faisal'],
    summary: "Kick-off meeting: Introduced project scope, set up communication channels, and agreed on weekly check-ins. All participants confirmed roles and responsibilities.",
    date: '2025-07-01',
    time: '9:00 AM',
  },
];

const Email = () => {
  const [selectedDate, setSelectedDate] = useState('');

  // Filter emails by selected date, or show all if none selected
  const filteredEmails = selectedDate
    ? emailCards.filter(card => card.date === selectedDate)
    : emailCards;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header title="Email" />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end items-center mb-4 gap-2">
              <input
                type="date"
                className="border rounded px-2 py-1 text-gray-700"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
              <span className="text-sm text-gray-600">Calendar Selection</span>
            </div>
            <div className="space-y-6">
              {filteredEmails.length === 0 && (
                <div className="text-center text-gray-500">No emails for this date.</div>
              )}
              {filteredEmails.map((card, idx) => (
                <div key={idx} className="bg-gray-200 rounded-lg p-2">
                  <div className="grid grid-cols-3 gap-4 items-start bg-white rounded p-4">
                    <div>
                      <div className="font-medium mb-2">Participants</div>
                      {card.participants.map((p, i) => (
                        <div key={i}>{p}</div>
                      ))}
                    </div>
                    <div className="col-span-1">
                      <div className="font-medium mb-2">Summary / Minutes / Transcription</div>
                      <div className="text-gray-700 text-sm">{card.summary}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium mb-2">Date and Time</div>
                      <div>{card.date} &nbsp; {card.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Email; 