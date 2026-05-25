export default function CoursesPage() {
  const tabs = ['All', 'Active', 'Completed', 'Upcoming'];

  const courses = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      instructor: 'Dr. Patricia Williams',
      students: 34,
      progress: 72,
      status: 'Active',
    },
    {
      id: 2,
      name: 'English Literature',
      instructor: 'Prof. Robert Davis',
      students: 28,
      progress: 85,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Physics 101',
      instructor: 'Dr. James Anderson',
      students: 31,
      progress: 60,
      status: 'Active',
    },
    {
      id: 4,
      name: 'World History',
      instructor: 'Ms. Linda Thompson',
      students: 26,
      progress: 100,
      status: 'Completed',
    },
    {
      id: 5,
      name: 'Computer Science',
      instructor: 'Mr. Kevin Park',
      students: 22,
      progress: 45,
      status: 'Active',
    },
    {
      id: 6,
      name: 'Biology Lab',
      instructor: 'Dr. Maria Garcia',
      students: 0,
      progress: 0,
      status: 'Upcoming',
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-text-secondary mt-1">Browse and manage all courses</p>
        </div>
        <button className="rounded-theme bg-primary px-6 py-2.5 text-white font-medium hover:bg-primary-hover transition">
          Create Course
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`px-5 py-2.5 text-sm font-medium transition border-b-2 ${
              index === 0
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-border rounded-theme p-6 bg-card hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-foreground text-lg">{course.name}</h3>
              <span
                className={`inline-block px-2.5 py-1 rounded-theme text-xs font-medium ${
                  course.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : course.status === 'Completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {course.status}
              </span>
            </div>

            <p className="text-sm text-text-secondary mb-1">{course.instructor}</p>
            <p className="text-sm text-text-secondary mb-4">{course.students} students enrolled</p>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style=\{{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex gap-3">
              <button className="text-sm text-primary hover:text-primary-hover font-medium transition">
                View Details
              </button>
              <button className="text-sm text-text-secondary hover:text-foreground transition">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
