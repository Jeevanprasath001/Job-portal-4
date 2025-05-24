import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Job {
  title: string;
  description: string;
  type: string;
  experience: string;
  level: string;
  department: string;
  location: string;
  company: string;
  salary: string;
  logoBg: string;
  logoViewBox: string;
  logoPath: string;
  logoFill: string;
  overview: string;
  jobDescription: string[];
  benefits: string[];
  applications: number;
  postedDate: Date;
}

interface FilterOption {
  name: string;
  checked: boolean;
  count: number;
}

interface Category {
  name: string;
  count: number;
}

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDetailPage = false;
  jobDetailTitle = '';
  jobDetailCompany = '';
  jobDetailLocation = '';
  jobDetailType = '';
  jobDetailExperience = '';
  jobDetailLevel = '';
  jobDetailSalary = '';
  jobDetailOverview = '';
  jobDetailDescription: string[] = [];
  jobDetailBenefits: string[] = [];
  jobDetailApplications = 0;
  jobLogo = '';
  jobBgStyle = '';
  jobDetailLogoBg = '';
  jobDetailLogoViewBox = '';
  jobDetailLogoPath = '';
  jobDetailLogoFill = '';
  isMenuOpen = false;
  isLoginMenuOpen = false;
  isModalOpen = false;
  isScrolledToBottom = false;
  selectedJob: Job | null = null;
  sortOption = 'newest';
  applicationForm: ApplicationForm = {
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  };

  searchQuery = '';
  locationFilter = '';
  searchTags: string[] = [];
  jobCategories: Category[] = [
    { name: 'Technology', count: 120 },
    { name: 'Design', count: 85 },
    { name: 'Marketing', count: 65 },
    { name: 'Sales', count: 50 },
    { name: 'Human Resources', count: 30 }
  ];
  employmentTypes: FilterOption[] = [
    { name: 'Full Time Jobs', checked: false, count: 56 },
    { name: 'Part Time Jobs', checked: false, count: 43 },
    { name: 'Remote Jobs', checked: false, count: 24 },
    { name: 'Internship Jobs', checked: false, count: 27 },
    { name: 'Contract', checked: false, count: 76 },
    { name: 'Training Jobs', checked: false, count: 28 }
  ];
  departments: FilterOption[] = [
    { name: 'Engineering', checked: false, count: 45 },
    { name: 'Design', checked: false, count: 30 },
    { name: 'Marketing', checked: false, count: 25 },
    { name: 'Sales', checked: false, count: 20 },
    { name: 'Human Resources', checked: false, count: 15 }
  ];
  seniorityLevels: FilterOption[] = [
    { name: 'Student Level', checked: false, count: 98 },
    { name: 'Entry Level', checked: false, count: 44 },
    { name: 'Mid Level', checked: false, count: 35 },
    { name: 'Senior Level', checked: false, count: 29 },
    { name: 'Directors', checked: false, count: 26 },
    { name: 'VP or Above', checked: false, count: 56 }
  ];
  salaryRanges: FilterOption[] = [
    { name: '₹20,000 - ₹30,000', checked: false, count: 49 },
    { name: '₹30,000 - ₹50,000', checked: false, count: 67 },
    { name: '₹50,000 - ₹80,000', checked: false, count: 24 },
    { name: '₹80,000 - ₹1,20,000', checked: false, count: 27 },
    { name: '₹1,20,000 - ₹2,00,000', checked: false, count: 76 },
    { name: '₹2,00,000+', checked: false, count: 18 }
  ];

  jobs: Job[] = [
    {
      title: 'UI / UX Designer',
      description: 'Create compelling digital user experiences for Tamil Nadu startups.',
      type: 'Full Time',
      experience: 'Min. 1 Year',
      level: 'Senior Level',
      department: 'Design',
      location: 'Chennai, Tamil Nadu',
      company: 'Zoho Corporation',
      salary: '₹80,000 / Month',
      logoBg: '#2e2882',
      logoViewBox: '0 -13 512 512',
      logoPath: 'M256 92.5l127.7 91.6L512 92 383.7 0 256 91.5 128.3 0 0 92l128.3 92zm0 0M256 275.9l-127.7-91.5L0 276.4l128.3 92L256 277l127.7 91.5 128.3-92-128.3-92zm0 0M127.7 394.1l128.4 92 128.3-92-128.3-92zm0 0M512 92L383.7 0 256 91.5v1l127.7 91.6zm0 0M512 276.4l-128.3-92L256 275.9v1l127.7 91.5zm0 0M256 486.1l128.4-92-128.3-92zm0 0',
      logoFill: '#feb0a5',
      overview: 'Work with innovative startups in Chennai to design user-friendly interfaces.',
      jobDescription: [
        '1+ years as a UI/UX designer.',
        'Portfolio showcasing user-centric designs.',
        'Proficiency in Figma and Sketch.',
        'Strong communication skills.',
        'Experience with Tamil Nadu-based clients is a plus.'
      ],
      benefits: [
        'Health insurance',
        'Flexible working hours',
        'Professional development stipend'
      ],
      applications: 98,
      postedDate: new Date('2025-05-09')
    },
    {
      title: 'Sr. Product Designer',
      description: 'Lead design for SaaS products in Coimbatore.',
      type: 'Full Time',
      experience: 'Min. 3 Years',
      level: 'Senior Level',
      department: 'Design',
      location: 'Coimbatore, Tamil Nadu',
      company: 'Freshworks',
      salary: '₹1,20,000 / Month',
      logoBg: '#f76754',
      logoViewBox: '0 0 32 32',
      logoPath: 'M0 .5h4.2v23H0zM15.4.5a8.6 8.6 0 100 17.2 8.6 8.6 0 000-17.2z',
      logoFill: '#fefefe',
      overview: 'Lead design efforts for SaaS products with a focus on user experience.',
      jobDescription: [
        '3+ years in product design.',
        'Expertise in Figma and Adobe XD.',
        'Experience leading design teams.',
        'Knowledge of SaaS product cycles.'
      ],
      benefits: [
        'Stock options',
        'Remote work allowance',
        'Annual performance bonus'
      ],
      applications: 65,
      postedDate: new Date('2025-05-07')
    },
    {
      title: 'Software Engineer',
      description: 'Develop scalable web applications in Madurai.',
      type: 'Full Time',
      experience: 'Min. 2 Years',
      level: 'Mid Level',
      department: 'Engineering',
      location: 'Madurai, Tamil Nadu',
      company: 'TCS',
      salary: '₹50,000 / Month',
      logoBg: '#4285f4',
      logoViewBox: '0 0 24 24',
      logoPath: 'M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z',
      logoFill: '#fff',
      overview: 'Build robust web applications for global clients.',
      jobDescription: [
        '2+ years in software development.',
        'Proficiency in JavaScript and Python.',
        'Experience with cloud platforms.',
        'Strong problem-solving skills.'
      ],
      benefits: [
        'Retirement plan',
        'Health and wellness programs',
        'Paid time off'
      ],
      applications: 120,
      postedDate: new Date('2025-05-05')
    },
    {
      title: 'Marketing Manager',
      description: 'Drive brand campaigns in Tiruchirappalli.',
      type: 'Full Time',
      experience: 'Min. 3 Years',
      level: 'Mid Level',
      department: 'Marketing',
      location: 'Tiruchirappalli, Tamil Nadu',
      company: 'PayPal India',
      salary: '₹60,000 / Month',
      logoBg: '#ff7a59',
      logoViewBox: '0 0 24 24',
      logoPath: 'M12 4l8 8-8 8-8-8 8-8z',
      logoFill: '#fff',
      overview: 'Lead marketing initiatives to enhance brand presence.',
      jobDescription: [
        '3+ years in marketing.',
        'Experience with digital campaigns.',
        'Strong analytical skills.',
        'Proficiency in CRM tools.'
      ],
      benefits: [
        'Performance-based incentives',
        'Travel allowance',
        'Team-building events'
      ],
      applications: 45,
      postedDate: new Date('2025-05-10')
    },
    {
      title: 'Sales Executive',
      description: 'Build client relationships in Salem.',
      type: 'Full Time',
      experience: 'Min. 2 Years',
      level: 'Entry Level',
      department: 'Sales',
      location: 'Salem, Tamil Nadu',
      company: 'Cognizant',
      salary: '₹30,000 / Month',
      logoBg: '#00a0110',
      logoViewBox: '0 0 24 24',
      logoPath: 'M12 2l10 10-10 10-10-10 10-10z',
      logoFill: '#fff',
      overview: 'Drive sales growth through client engagement.',
      jobDescription: [
        '2+ years in sales.',
        'Strong communication skills.',
        'Experience with CRM software.',
        'Ability to meet sales targets.'
      ],
      benefits: [
        'Commission-based earnings',
        'Health insurance',
        'Career growth opportunities'
      ],
      applications: 75,
      postedDate: new Date('2025-05-08')
    },
    {
      title: 'HR Specialist',
      description: 'Manage recruitment in Erode.',
      type: 'Full Time',
      experience: 'Min. 1 Year',
      level: 'Entry Level',
      department: 'Human Resources',
      location: 'Erode, Tamil Nadu',
      company: 'Wipro',
      salary: '₹25,000 / Month',
      logoBg: '#007ee5',
      logoViewBox: '0 0 24 24',
      logoPath: 'M4 4h16v16H4z',
      logoFill: '#fff',
      overview: 'Support HR functions including hiring and employee relations.',
      jobDescription: [
        '1+ year in HR.',
        'Knowledge of recruitment processes.',
        'Strong interpersonal skills.',
        'Familiarity with HRIS systems.'
      ],
      benefits: [
        'Employee wellness programs',
        'Flexible work schedule',
        'Training opportunities'
      ],
      applications: 30,
      postedDate: new Date('2025-05-06')
    },
    {
      title: 'Data Analyst',
      description: 'Analyze data in Vellore.',
      type: 'Full Time',
      experience: 'Min. 2 Years',
      level: 'Mid Level',
      department: 'Engineering',
      location: 'Vellore, Tamil Nadu',
      company: 'Infosys',
      salary: '₹45,000 / Month',
      logoBg: '#e97627',
      logoViewBox: '0 0 24 24',
      logoPath: 'M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z',
      logoFill: '#fff',
      overview: 'Provide actionable insights through data analysis.',
      jobDescription: [
        '2+ years in data analysis.',
        'Proficiency in SQL and Python.',
        'Experience with BI tools.',
        'Strong analytical skills.'
      ],
      benefits: [
        'Data training programs',
        'Health benefits',
        'Remote work options'
      ],
      applications: 88,
      postedDate: new Date('2025-05-04')
    },
    {
      title: 'Product Manager',
      description: 'Lead product strategy in Tirunelveli.',
      type: 'Full Time',
      experience: 'Min. 4 Years',
      level: 'Senior Level',
      department: 'Engineering',
      location: 'Tirunelveli, Tamil Nadu',
      company: 'HCL Technologies',
      salary: '₹1,00,000 / Month',
      logoBg: '#0052cc',
      logoViewBox: '0 0 24 24',
      logoPath: 'M12 4l8 8-8 8-8-8 8-8z',
      logoFill: '#fff',
      overview: 'Oversee product development lifecycle.',
      jobDescription: [
        '4+ years in product management.',
        'Experience with agile methodologies.',
        'Strong leadership skills.',
        'Familiarity with Jira and Confluence.'
      ],
      benefits: [
        'Leadership training',
        'Stock options',
        'Generous PTO'
      ],
      applications: 55,
      postedDate: new Date('2025-05-03')
    }
  ];

  filteredJobs: Job[] = [...this.jobs];

  ngOnInit(): void {
    const searchBox = document.querySelector('.search-box') as HTMLInputElement;
    if (searchBox) {
      searchBox.focus();
    }
    this.updateScrollButtonVisibility();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    if (wrapper.scrollTop > 30) {
      wrapper.classList.add('header-shadow');
    } else {
      wrapper.classList.remove('header-shadow');
    }
    this.updateScrollButtonVisibility();
  }

  updateScrollButtonVisibility(): void {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    if (wrapper) {
      const scrollPosition = wrapper.scrollTop + wrapper.clientHeight;
      const scrollHeight = wrapper.scrollHeight;
      this.isScrolledToBottom = scrollPosition >= scrollHeight - 10;
    }
  }

  toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isLoginMenuOpen = false;
  }

  toggleLoginMenu(): void {
    this.isLoginMenuOpen = !this.isLoginMenuOpen;
  }

  selectCategory(category: Category): void {
    this.searchQuery = category.name;
    this.filterJobs();
  }

  filterJobs(): void {
    const query = this.searchQuery.toLowerCase().trim();
    const location = this.locationFilter.toLowerCase().trim();
    const selectedTypes = this.employmentTypes.filter(type => type.checked).map(type => type.name);
    const selectedDepts = this.departments.filter(dept => dept.checked).map(dept => dept.name);
    const selectedLevels = this.seniorityLevels.filter(level => level.checked).map(level => level.name);
    const selectedSalaries = this.salaryRanges.filter(range => range.checked).map(range => range.name);

    this.filteredJobs = this.jobs.filter(job => {
      const matchesQuery = query ? (
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query)
      ) : true;

      const matchesLocation = location ? job.location.toLowerCase().includes(location) : true;
      const matchesType = selectedTypes.length ? selectedTypes.includes(job.type) : true;
      const matchesDept = selectedDepts.length ? selectedDepts.includes(job.department) : true;
      const matchesLevel = selectedLevels.length ? selectedLevels.includes(job.level) : true;
      const matchesSalary = selectedSalaries.length ? selectedSalaries.some(salary => job.salary.includes(salary)) : true;

      return matchesQuery && matchesLocation && matchesType && matchesDept && matchesLevel && matchesSalary;
    });

    if (query && !this.searchTags.includes(query) && query.length > 2) {
      this.searchTags.push(query);
      this.searchQuery = '';
    }

    this.sortJobs();
  }

  sortJobs(): void {
    this.filteredJobs = [...this.filteredJobs].sort((a, b) => {
      switch (this.sortOption) {
        case 'newest':
          return b.postedDate.getTime() - a.postedDate.getTime();
        case 'oldest':
          return a.postedDate.getTime() - b.postedDate.getTime();
        case 'salary-desc':
          return this.parseSalary(b.salary) - this.parseSalary(a.salary);
        case 'salary-asc':
          return this.parseSalary(a.salary) - this.parseSalary(b.salary);
        default:
          return 0;
      }
    });
  }

  parseSalary(salary: string): number {
    const match = salary.match(/₹([\d,]+).*\/ Month/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  }

  removeTag(tag: string): void {
    this.searchTags = this.searchTags.filter(t => t !== tag);
    this.filterJobs();
  }

  onJobCardClick(target: EventTarget | null): void {
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const title = target.querySelector('.job-card-title')?.textContent || '';
    const job = this.jobs.find(j => j.title === title);
    if (!job) return;

    const number = Math.floor(Math.random() * 10);
    const url = `https://unsplash.it/640/425?image=${number}`;

    this.jobBgStyle = `background: ${job.logoBg}; background-image: url(${url}); background-size: cover;`;
    this.jobDetailTitle = job.title;
    this.jobDetailCompany = job.company;
    this.jobDetailLocation = job.location;
    this.jobDetailType = job.type;
    this.jobDetailExperience = job.experience;
    this.jobDetailLevel = job.level;
    this.jobDetailSalary = job.salary;
    this.jobDetailOverview = job.overview;
    this.jobDetailDescription = job.jobDescription;
    this.jobDetailBenefits = job.benefits;
    this.jobDetailApplications = job.applications;
    this.jobLogo = `<svg viewBox="${job.logoViewBox}" xmlns="http://www.w3.org/2000/svg"><path d="${job.logoPath}" fill="${job.logoFill}"/></svg>`;
    this.jobDetailLogoBg = job.logoBg;
    this.jobDetailLogoViewBox = job.logoViewBox;
    this.jobDetailLogoPath = job.logoPath;
    this.jobDetailLogoFill = job.logoFill;
    this.isDetailPage = true;

    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onLogoClick(): void {
    this.isDetailPage = false;
    this.jobBgStyle = '';
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModal(job: Job): void {
    this.selectedJob = job;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedJob = null;
    this.applicationForm = {
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null
    };
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.applicationForm.resume = input.files[0];
    }
  }

  submitApplication(): void {
    if (this.applicationForm.name && this.applicationForm.email) {
      console.log('Application submitted:', this.applicationForm);
      alert('Application submitted successfully!');
      this.closeModal();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  toggleScroll(): void {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    if (wrapper) {
      if (this.isScrolledToBottom) {
        wrapper.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
      }
    }
  }
}
