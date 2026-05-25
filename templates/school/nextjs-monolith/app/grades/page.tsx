export default function GradesPage() {
  const summaryStats = [
    { label: 'Class Average', value: '78.4%' },
    { label: 'Highest Score', value: '98%' },
    { label: 'Submissions', value: '1,243' },
  ];

  const grades = [
    { id: 1, student: 'Sarah Johnson', course: 'Advanced Mathematics', assignment: 'Midterm Exam', score: 92, letter: 'A', date: '2024-03-15' },
    { id: 2, student: 'Michael Chen', course: 'Physics 101', assignment: 'Lab Report 4', score: 87, letter: 'B+', date: '2024-03-14' },
    { id: 3, student: 'Emily Rodriguez', course: 'English Literature', assignment: 'Essay: Modern Poetry', score: 95, letter: 'A', date: '2024-03-14' },
    { id: 4, student: 'James Wilson', course: 'World History', assignment: 'Chapter 8 Quiz', score: 68, letter: 'D+', date: '2024-03-13' },
    { id: 5, student: 'Aisha Patel', course: 'Computer Science', assignment: 'Project: Sorting Algorithms', score: 98, letter: 'A+', date: '2024-03-13' },
    { id: 6, student: 'David Kim', course: 'Advanced Mathematics', assignment: 'Homework Set 7', score: 74, letter: 'C', date: '2024-03-12' },
    { id: 7, student: 'Olivia Brown', course: 'Biology Lab', assignment: 'Dissection Report', score: 89, letter: 'B+', date: '2024-03-12' },
    { id: 8, student: 'Lucas Martinez', course: 'Physics 101', assignment: 'Problem Set 5', score: 81, letter: 'B-', date: '2024-03-11' },
  ];

  function getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grades</h1>
          <p className="text-text-secondary mt-1">View and manage student grades and assessments</p>
        </div>
        <button className="rounded-theme bg-primary px-6 py-2.5 text-white font-medium hover:bg-primary-hover transition">
          Enter Grades
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border rounded-theme p-6 bg-card text-center"
          >
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select className="px-4 py-2.5 rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Courses</option>
          <option>Advanced Mathematics</option>
          <option>Physics 101</option>
          <option>English Literature</option>
          <option>World History</option>
          <option>Computer Science</option>
          <option>Biology Lab</option>
        </select>
        <select className="px-4 py-2.5 rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Assignments</option>
          <option>Exams</option>
          <option>Homework</option>
          <option>Projects</option>
          <option>Quizzes</option>
        </select>
        <input
          type="date"
          className="px-4 py-2.5 rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Grades Table */}
      <div className="border border-border rounded-theme overflow-hidden bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Student</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Course</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Assignment</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Score</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Grade</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {grades.map((entry) => (
              <tr key={entry.id} className="hover:bg-bg-secondary transition">
                <td className="px-6 py-4 font-medium text-foreground">{entry.student}</td>
                <td className="px-6 py-4 text-text-secondary">{entry.course}</td>
                <td className="px-6 py-4 text-foreground">{entry.assignment}</td>
                <td className={`px-6 py-4 font-semibold ${getScoreColor(entry.score)}`}>
                  {entry.score}%
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2.5 py-1 rounded-theme bg-bg-secondary text-foreground text-sm font-medium">
                    {entry.letter}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary text-sm">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
