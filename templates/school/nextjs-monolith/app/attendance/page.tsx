export default function AttendancePage() {
  const summaryCards = [
    { label: 'Present', value: 142, color: 'bg-green-100 text-green-800' },
    { label: 'Absent', value: 12, color: 'bg-red-100 text-red-800' },
    { label: 'Late', value: 8, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Excused', value: 5, color: 'bg-blue-100 text-blue-800' },
  ];

  const classes = [
    {
      name: 'Advanced Mathematics - Period 1',
      instructor: 'Dr. Patricia Williams',
      students: [
        { id: 1, name: 'Sarah Johnson', status: 'Present' },
        { id: 2, name: 'Michael Chen', status: 'Present' },
        { id: 3, name: 'Emily Rodriguez', status: 'Late' },
        { id: 4, name: 'James Wilson', status: 'Absent' },
        { id: 5, name: 'Aisha Patel', status: 'Present' },
      ],
    },
    {
      name: 'English Literature - Period 2',
      instructor: 'Prof. Robert Davis',
      students: [
        { id: 6, name: 'David Kim', status: 'Present' },
        { id: 7, name: 'Olivia Brown', status: 'Present' },
        { id: 8, name: 'Lucas Martinez', status: 'Excused' },
        { id: 9, name: 'Sophia Lee', status: 'Present' },
        { id: 10, name: 'Noah Taylor', status: 'Present' },
      ],
    },
    {
      name: 'Physics 101 - Period 3',
      instructor: 'Dr. James Anderson',
      students: [
        { id: 11, name: 'Isabella White', status: 'Present' },
        { id: 12, name: 'Ethan Harris', status: 'Absent' },
        { id: 13, name: 'Mia Clark', status: 'Present' },
        { id: 14, name: 'Alexander Lewis', status: 'Late' },
        { id: 15, name: 'Charlotte Walker', status: 'Present' },
      ],
    },
  ];

  function getStatusStyle(status: string): string {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      case 'Excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-text-secondary mt-1">Track and manage daily attendance records</p>
        </div>
        <button className="rounded-theme bg-primary px-6 py-2.5 text-white font-medium hover:bg-primary-hover transition">
          Export Report
        </button>
      </div>

      {/* Date Selector */}
      <div className="flex items-center gap-4 mb-8">
        <button className="px-3 py-2 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition">
          ←
        </button>
        <div className="flex items-center gap-3">
          <input
            type="date"
            defaultValue="2024-03-15"
            className="px-4 py-2.5 rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2.5 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition text-sm">
            Today
          </button>
        </div>
        <button className="px-3 py-2 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition">
          →
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="border border-border rounded-theme p-5 bg-card text-center"
          >
            <p className="text-sm text-text-secondary">{card.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-theme text-xs font-medium ${card.color}`}>
              {card.label}
            </span>
          </div>
        ))}
      </div>

      {/* Class-by-Class Attendance */}
      <div className="space-y-6">
        {classes.map((cls) => (
          <div key={cls.name} className="border border-border rounded-theme bg-card overflow-hidden">
            <div className="px-6 py-4 bg-bg-secondary border-b border-border">
              <h3 className="font-semibold text-foreground">{cls.name}</h3>
              <p className="text-sm text-text-secondary">{cls.instructor}</p>
            </div>
            <div className="divide-y divide-border">
              {cls.students.map((student) => (
                <div
                  key={student.id}
                  className="px-6 py-3 flex items-center justify-between"
                >
                  <span className="text-foreground">{student.name}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-theme text-xs font-medium ${getStatusStyle(student.status)}`}
                    >
                      {student.status}
                    </span>
                    <select
                      defaultValue={student.status}
                      className="px-3 py-1.5 rounded-theme border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Late</option>
                      <option>Excused</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
