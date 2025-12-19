"use client";

import React, { useState } from "react";
import { DataGrid, GridColDef, LoadingState } from "./data-grid";
import { Button } from "../button";

// Sample data interface
interface Course {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  status: "active" | "inactive" | "pending";
  instructor?: string;
  price: number;
  currency: string;
  duration: number; // in hours
  students: number;
  lastUpdated: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
}

// Extended sample data with more entries
const sampleRows: Course[] = [
  {
    id: 1,
    name: "Advanced React Development",
    rating: 4.8,
    reviewCount: 156,
    category: "Programming",
    status: "active",
    instructor: "Sarah Johnson",
    price: 299,
    currency: "USD",
    duration: 40,
    students: 2850,
    lastUpdated: "2024-03-15",
    difficulty: "advanced",
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: 2,
    name: "Machine Learning Fundamentals",
    rating: 4.6,
    reviewCount: 243,
    category: "Data Science",
    status: "active",
    instructor: "Dr. Michael Chen",
    price: 399,
    currency: "USD",
    duration: 60,
    students: 1920,
    lastUpdated: "2024-03-12",
    difficulty: "intermediate",
    tags: ["Python", "ML", "AI"],
  },
  {
    id: 3,
    name: "Digital Marketing Mastery",
    rating: 4.4,
    reviewCount: 89,
    category: "Marketing",
    status: "active",
    instructor: "Emma Davis",
    price: 199,
    currency: "USD",
    duration: 25,
    students: 3240,
    lastUpdated: "2024-03-18",
    difficulty: "beginner",
    tags: ["SEO", "Social Media", "Analytics"],
  },
  {
    id: 4,
    name: "Full-Stack Web Development",
    rating: 4.9,
    reviewCount: 312,
    category: "Programming",
    status: "active",
    instructor: "Alex Rodriguez",
    price: 499,
    currency: "USD",
    duration: 80,
    students: 1560,
    lastUpdated: "2024-03-20",
    difficulty: "intermediate",
    tags: ["Node.js", "React", "MongoDB"],
  },
  {
    id: 5,
    name: "UX/UI Design Principles",
    rating: 4.3,
    reviewCount: 67,
    category: "Design",
    status: "pending",
    instructor: "Jessica Park",
    price: 249,
    currency: "USD",
    duration: 35,
    students: 890,
    lastUpdated: "2024-03-10",
    difficulty: "beginner",
    tags: ["Figma", "Prototyping", "User Research"],
  },
  {
    id: 6,
    name: "Cloud Computing with AWS",
    rating: 4.7,
    reviewCount: 198,
    category: "Cloud",
    status: "active",
    instructor: "Robert Kim",
    price: 349,
    currency: "USD",
    duration: 45,
    students: 2100,
    lastUpdated: "2024-03-22",
    difficulty: "intermediate",
    tags: ["AWS", "DevOps", "Infrastructure"],
  },
  {
    id: 7,
    name: "Mobile App Development",
    rating: 4.5,
    reviewCount: 134,
    category: "Programming",
    status: "active",
    instructor: "Maria Garcia",
    price: 329,
    currency: "USD",
    duration: 50,
    students: 1750,
    lastUpdated: "2024-03-14",
    difficulty: "intermediate",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    id: 8,
    name: "Cybersecurity Fundamentals",
    rating: 4.2,
    reviewCount: 75,
    category: "Security",
    status: "inactive",
    instructor: "David Wilson",
    price: 279,
    currency: "USD",
    duration: 30,
    students: 1240,
    lastUpdated: "2024-02-28",
    difficulty: "beginner",
    tags: ["Security", "Networking", "Ethical Hacking"],
  },
  {
    id: 9,
    name: "Data Analytics with Python",
    rating: 4.6,
    reviewCount: 167,
    category: "Data Science",
    status: "active",
    instructor: "Dr. Lisa Anderson",
    price: 299,
    currency: "USD",
    duration: 42,
    students: 2200,
    lastUpdated: "2024-03-19",
    difficulty: "intermediate",
    tags: ["Python", "Pandas", "Visualization"],
  },
  {
    id: 10,
    name: "Blockchain Development",
    rating: 4.1,
    reviewCount: 52,
    category: "Programming",
    status: "pending",
    instructor: "Christopher Lee",
    price: 449,
    currency: "USD",
    duration: 55,
    students: 680,
    lastUpdated: "2024-03-08",
    difficulty: "advanced",
    tags: ["Blockchain", "Solidity", "Web3"],
  },
  {
    id: 11,
    name: "Project Management Professional",
    rating: 4.4,
    reviewCount: 98,
    category: "Business",
    status: "active",
    instructor: "Jennifer Brown",
    price: 199,
    currency: "USD",
    duration: 28,
    students: 3100,
    lastUpdated: "2024-03-16",
    difficulty: "beginner",
    tags: ["PMP", "Agile", "Scrum"],
  },
  {
    id: 12,
    name: "Financial Analysis & Modeling",
    rating: 4.5,
    reviewCount: 121,
    category: "Finance",
    status: "active",
    instructor: "Mark Thompson",
    price: 359,
    currency: "USD",
    duration: 38,
    students: 1450,
    lastUpdated: "2024-03-21",
    difficulty: "intermediate",
    tags: ["Excel", "Valuation", "Financial Modeling"],
  },
  {
    id: 13,
    name: "Artificial Intelligence Ethics",
    rating: 4.3,
    reviewCount: 43,
    category: "AI",
    status: "active",
    instructor: "Dr. Rachel Green",
    price: 179,
    currency: "USD",
    duration: 20,
    students: 980,
    lastUpdated: "2024-03-11",
    difficulty: "beginner",
    tags: ["Ethics", "AI", "Philosophy"],
  },
  {
    id: 14,
    name: "DevOps Engineering Pipeline",
    rating: 4.7,
    reviewCount: 186,
    category: "DevOps",
    status: "active",
    instructor: "Thomas Miller",
    price: 389,
    currency: "USD",
    duration: 48,
    students: 1680,
    lastUpdated: "2024-03-17",
    difficulty: "advanced",
    tags: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 15,
    name: "Content Marketing Strategy",
    rating: 4.2,
    reviewCount: 76,
    category: "Marketing",
    status: "inactive",
    instructor: "Sophie Turner",
    price: 149,
    currency: "USD",
    duration: 22,
    students: 2580,
    lastUpdated: "2024-02-25",
    difficulty: "beginner",
    tags: ["Content", "Strategy", "Copywriting"],
  },
];

export function DataGridExample() {
  // Loading states
  const [loadingState, setLoadingState] = useState<LoadingState>(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Loading control functions
  const simulateLoading = (
    type: "skeleton" | "overlay" | "spinner",
    duration = 3000
  ) => {
    setLoadingState({
      type,
      message:
        type === "skeleton"
          ? "Veriler yükleniyor..."
          : type === "overlay"
          ? "Veriler güncelleniyor..."
          : "Yenileniyor...",
      showProgress: type === "overlay",
    });

    setTimeout(() => {
      setLoadingState(false);
    }, duration);
  };

  // Star rating component
  const StarRating = ({
    rating,
    reviewCount,
  }: {
    rating: number;
    reviewCount: number;
  }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="d-flex align-items-center gap-2">
        <div className="star-rating">
          {[...Array(fullStars)].map((_, i) => (
            <span key={i} className="star">
              ★
            </span>
          ))}
          {hasHalfStar && <span className="star">☆</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={i} className="star empty">
              ☆
            </span>
          ))}
        </div>
        <small className="text-muted">({reviewCount} Reviews)</small>
      </div>
    );
  };

  // Action handlers
  const handleEdit = (course: Course) => {
    alert(`Edit course: ${course.name}`);
  };

  const handleDelete = (course: Course) => {
    if (confirm(`Are you sure you want to delete ${course.name}?`)) {
      alert(`Deleted course: ${course.name}`);
    }
  };

  const handleView = (course: Course) => {
    alert(`View details for: ${course.name}`);
  };

  // Column definitions with modern design and valueGetter examples
  const columns: GridColDef<Course>[] = [
    {
      field: "name",
      headerName: "Course Details",
      width: 280,
      editable: true,
      priority: 1, // Show first on mobile
      renderCell: (params) => (
        <div>
          <div className="fw-semibold text-dark mb-1">{params.value}</div>
          <small className="text-muted d-flex align-items-center">
            <i className="ph ph-user me-1"></i>
            {params.row.instructor}
          </small>
          <div className="d-flex gap-1 mt-1">
            {params.row.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="badge bg-light text-dark"
                style={{ fontSize: "0.7rem" }}
              >
                {tag}
              </span>
            ))}
            {params.row.tags.length > 2 && (
              <span
                className="badge bg-secondary"
                style={{ fontSize: "0.7rem" }}
              >
                +{params.row.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      field: "rating",
      headerName: "Reviews & Rating",
      width: 200,
      sortable: true,
      hideOnMobile: true, // Hide on mobile devices
      renderCell: (params) => (
        <div>
          <StarRating
            rating={params.value}
            reviewCount={params.row.reviewCount}
          />
          <div className="mt-1">
            <small className="text-muted">
              {params.row.students.toLocaleString()} students
            </small>
          </div>
        </div>
      ),
    },
    {
      field: "priceInfo",
      headerName: "Price & Duration",
      width: 160,
      sortable: false,
      priority: 2, // Show second on mobile
      // Example of valueGetter - combines multiple fields into one display value
      valueGetter: (value, row) => {
        return `${row.currency} ${row.price} • ${row.duration}h`;
      },
      renderCell: (params) => (
        <div>
          <div className="fw-semibold text-success">
            {params.row.currency} ${params.row.price}
          </div>
          <small className="text-muted">
            <i className="ph ph-clock me-1"></i>
            {params.row.duration} hours
          </small>
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      hideOnMobile: true, // Hide on mobile devices
      renderCell: (params) => (
        <span className="custom-badge age-badge">{params.value}</span>
      ),
    },
    {
      field: "difficulty",
      headerName: "Level",
      width: 110,
      hideOnMobile: true, // Hide on mobile devices
      // Another valueGetter example - transforms data for display and sorting
      valueGetter: (value, row) => {
        const levels: Record<string, number> = {
          beginner: 1,
          intermediate: 2,
          advanced: 3,
        };
        return levels[row.difficulty] || 0;
      },
      renderCell: (params) => {
        const difficultyColors = {
          beginner: "success",
          intermediate: "warning",
          advanced: "danger",
        };
        return (
          <span
            className={`badge bg-${difficultyColors[params.row.difficulty]}`}
          >
            {params.row.difficulty}
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      priority: 3, // Show on mobile if space allows
      renderCell: (params) => {
        const statusConfig: Record<string, { color: string; icon: string }> = {
          active: { color: "success", icon: "ph-check-circle-fill" },
          inactive: { color: "danger", icon: "ph-x-circle-fill" },
          pending: { color: "warning", icon: "ph-clock-fill" },
        };
        const config = statusConfig[params.value] || statusConfig.active;
        return (
          <span
            className={`badge bg-${config.color} d-flex align-items-center gap-1`}
          >
            <i className={`ph ${config.icon}`}></i>
            {params.value}
          </span>
        );
      },
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      width: 140,
      hideOnMobile: true, // Hide on mobile devices
      // ValueGetter example for date formatting and sorting
      valueGetter: (value, row) => {
        const date = new Date(row.lastUpdated);
        return date.getTime(); // Return timestamp for proper sorting
      },
      renderCell: (params) => {
        const date = new Date(params.row.lastUpdated);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return (
          <div>
            <div className="text-dark" style={{ fontSize: "0.875rem" }}>
              {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
            <small className="text-muted">{diffDays} days ago</small>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      align: "right",
      priority: 4, // Lower priority on mobile, but still visible if needed
      renderCell: (params) => {
        return (
          <div className="data-grid-actions">
            <Button
              variant="outline"
              size="sm"
              className="data-grid-action-btn btn-view"
              onClick={() => handleView(params.row)}
            >
              <i className="ph ph-eye"></i>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="data-grid-action-btn btn-edit"
              onClick={() => handleEdit(params.row)}
            >
              <i className="ph ph-pencil"></i>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="data-grid-action-btn btn-delete"
              onClick={() => handleDelete(params.row)}
            >
              <i className="ph ph-trash"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  // Handle row selection
  const handleRowSelectionChange = (selectedRows: Course[]) => {
    // console.log("Selected rows:", selectedRows);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header bg-white border-0 pb-0">
              <h2 className="card-title mb-2 fw-bold">
                Advanced Course Management DataGrid
              </h2>
              <p className="card-text text-muted mb-0">
                Comprehensive DataGrid with advanced features: valueGetter
                functions, complex cell renderers, multi-field sorting, and rich
                data visualization. Contains 15+ sample courses with detailed
                information.
              </p>
            </div>
            <div className="card-body pt-3">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Core Features:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      ValueGetter examples for computed columns
                    </li>
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      Complex multi-field cell renderers
                    </li>
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      Dynamic badge styling based on data
                    </li>
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      Formatted date display with relative time
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Data & Design:</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      15+ detailed course records
                    </li>
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      Tag system with overflow indicators
                    </li>
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      Price formatting and currency display
                    </li>
                    <li className="mb-2">
                      <i className="ph ph-check-circle text-success me-2"></i>
                      Modern HSL-based color system
                    </li>
                  </ul>
                </div>
              </div>

              {/* Loading State Controls */}
              <div className="mb-4">
                <h6 className="fw-semibold mb-3">Loading State Examples:</h6>
                <div className="d-flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon="ph-skeleton"
                    onClick={() => simulateLoading("skeleton")}
                    disabled={!!loadingState}
                  >
                    Skeleton Loading
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon="ph-overlay"
                    onClick={() => simulateLoading("overlay")}
                    disabled={!!loadingState}
                  >
                    Overlay Loading
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon="ph-spinner-gap"
                    onClick={() => simulateLoading("spinner")}
                    disabled={!!loadingState}
                  >
                    Spinner Loading
                  </Button>
                  {loadingState && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon="ph-x"
                      onClick={() => setLoadingState(false)}
                      className="btn-outline-danger"
                    >
                      Stop Loading
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon="ph-database"
                    onClick={() => setShowEmptyState(!showEmptyState)}
                    disabled={!!loadingState}
                  >
                    {showEmptyState ? "Show Data" : "Show Empty State"}
                  </Button>
                </div>
                <small className="text-muted d-block mt-2">
                  Test farklı loading durumlarını ve empty state&apos;i görmek
                  için yukarıdaki butonları kullanın.
                </small>
              </div>
            </div>
          </div>

          <DataGrid
            rows={showEmptyState ? [] : sampleRows}
            columns={columns}
            loading={loadingState}
            emptyState={{
              icon: "ph-graduation-cap",
              title: "Henüz Kurs Bulunmuyor",
              description:
                "Öğrencileriniz için harika kurslar oluşturmaya başlayın.",
              showActions: true,
              onAddNew: () => alert("Yeni kurs ekleme formu açılacak"),
              onRefresh: () => setShowEmptyState(false),
              addButtonText: "İlk Kursu Oluştur",
              refreshButtonText: "Kursları Göster",
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionChange={handleRowSelectionChange}
            height="auto"
          />

          <div className="card mt-4">
            <div className="card-header bg-white border-0">
              <h5 className="card-title mb-0 fw-semibold">
                Implementation Guide
              </h5>
            </div>
            <div className="card-body">
              <div className="bg-light p-4 rounded-3">
                <h6 className="fw-semibold mb-3">
                  ValueGetter Usage Examples:
                </h6>
                <pre
                  className="mb-4 text-dark"
                  style={{ fontSize: "13px", lineHeight: "1.6" }}
                >
                  {`// Example 1: Combine multiple fields for display and sorting
{
  field: "priceInfo",
  headerName: "Price & Duration", 
  valueGetter: (value, row) => {
    return \`\${row.currency} \${row.price} • \${row.duration}h\`;
  },
  renderCell: (params) => (
    <div>
      <div className="fw-semibold text-success">
        {params.row.currency} $\{params.row.price}
      </div>
      <small className="text-muted">
        {params.row.duration} hours
      </small>
    </div>
  ),
}

// Example 2: Transform enum values for proper sorting
{
  field: "difficulty",
  headerName: "Level",
  valueGetter: (value, row) => {
    const levels: Record<string, number> = { 
      beginner: 1, intermediate: 2, advanced: 3 
    };
    return levels[row.difficulty] || 0;
  },
  renderCell: (params) => (
    <span className={\`badge bg-\${difficultyColors[params.row.difficulty]}\`}>
      {params.row.difficulty}
    </span>
  ),
}

// Example 3: Date formatting with computed values
{
  field: "lastUpdated",
  headerName: "Last Updated",
  valueGetter: (value, row) => {
    const date = new Date(row.lastUpdated);
    return date.getTime(); // Return timestamp for proper sorting
  },
  renderCell: (params) => {
    const date = new Date(params.row.lastUpdated);
    const diffDays = Math.ceil(
      Math.abs(new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
      <div>
        <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        <small className="text-muted">{diffDays} days ago</small>
      </div>
    );
  },
}`}
                </pre>

                <h6 className="fw-semibold mb-3">Basic Implementation:</h6>
                <pre
                  className="mb-0 text-dark"
                  style={{ fontSize: "13px", lineHeight: "1.6" }}
                >
                  {`import { DataGrid, GridColDef } from "@/components/ui/data-grid";

const columns: GridColDef<YourDataType>[] = [
  {
    field: "name",
    headerName: "Course Details",
    width: 280,
    renderCell: (params) => (
      <div>
        <div className="fw-semibold">{params.value}</div>
        <small className="text-muted">{params.row.instructor}</small>
      </div>
    ),
  },
  {
    field: "actions", 
    headerName: "Actions",
    sortable: false,
    renderCell: (params) => (
      <div className="data-grid-actions">
        <button className="data-grid-action-btn" onClick={() => edit(params.row)}>
          <i className="ph ph-pencil"></i>
        </button>
      </div>
    ),
  },
];

<DataGrid
  rows={yourData}
  columns={columns}
  checkboxSelection
  pageSizeOptions={[10, 15, 20, 25]}
  initialState={{
    pagination: { paginationModel: { pageSize: 10 } }
  }}
/>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export
export default DataGridExample;
