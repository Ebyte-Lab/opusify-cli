export default function StudentsPage() {
  const students = [
    { id: 'STU-001', name: 'Sarah Johnson', grade: 'Grade 11', status: 'Active', email: 'sarah.j@school.edu' },
    { id: 'STU-002', name: 'Michael Chen', grade: 'Grade 10', status: 'Active', email: 'michael.c@school.edu' },
    { id: 'STU-003', name: 'Emily Rodriguez', grade: 'Grade 12', status: 'Active', email: 'emily.r@school.edu' },
    { id: 'STU-004', name: 'James Wilson', grade: 'Grade 9', status: 'Probation', email: 'james.w@school.edu' },
    { id: 'STU-005', name: 'Aisha Patel', grade: 'Grade 11', status: 'Active', email: 'aisha.p@school.edu' },
    { id: 'STU-006', name: 'David Kim', grade: 'Grade 10', status: 'Active', email: 'david.k@school.edu' },
    { id: 'STU-007', name: 'Olivia Brown', grade: 'Grade 12', status: 'Graduated', email: 'olivia.b@school.edu' },
    { id: 'STU-008', name: 'Lucas Martinez', grade: 'Grade 9', status: 'Active', email: 'lucas.m@school.edu' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-text-secondary mt-1">Manage and view all enrolled students</p>
        </div>
        <button className="rounded-theme bg-primary px-6 py-2.5 text-white font-medium hover:bg-primary-hover transition">
          Add Student
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search students by name, ID, or email..."
            className="w-full px-4 py-2.5 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select className="px-4 py-2.5 rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Grades</option>
          <option>Grade 9</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
          <option>Grade 12</option>
        </select>
        <select className="px-4 py-2.5 rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Status</option>
          <option>Active</option>
          <option>Probation</option>
          <option>Graduated</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="border border-border rounded-theme overflow-hidden bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Grade/Level</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-bg-secondary transition">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-text-secondary">{student.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary text-sm font-mono">{student.id}</td>
                <td className="px-6 py-4 text-foreground">{student.grade}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-theme text-xs font-medium ${
                      student.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : student.status === 'Probation'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-sm text-primary hover:text-primary-hover transition">View</button>
                    <button className="text-sm text-text-secondary hover:text-foreground transition">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-text-secondary">Showing 1-8 of 2,847 students</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition text-sm">
            Previous
          </button>
          <button className="px-4 py-2 rounded-theme bg-primary text-white text-sm font-medium">
            1
          </button>
          <button className="px-4 py-2 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition text-sm">
            2
          </button>
          <button className="px-4 py-2 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition text-sm">
            3
          </button>
          <button className="px-4 py-2 rounded-theme border border-border text-text-secondary hover:bg-bg-secondary transition text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
