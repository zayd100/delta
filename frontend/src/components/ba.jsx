import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, LineChart, Line } from 'recharts';
import { Search, Filter, Download, TrendingUp, Globe, Building, Users, Calendar, Target, Award, MapPin } from 'lucide-react';

const BusinessAnalyticsDashboard = () => {
  const [rawData] = useState([
    { name: "Liu-Hoover", country: "Western Sahara", industry: "Online Publishing", number_of_employees: 6852, founded: 1980 },
    { name: "Orr-Armstrong", country: "Algeria", industry: "Import / Export", number_of_employees: 7994, founded: 1970 },
    { name: "Gill-Lamb", country: "Cote d'Ivoire", industry: "Apparel / Fashion", number_of_employees: 5105, founded: 2005 },
    { name: "Bauer-Weiss", country: "United States of America", industry: "Dairy", number_of_employees: 9069, founded: 2015 },
    { name: "Love-Palmer", country: "Denmark", industry: "Management Consulting", number_of_employees: 6991, founded: 2010 },
    { name: "Farmer, Edwards and Andrade", country: "Norfolk Island", industry: "Mental Health Care", number_of_employees: 3503, founded: 2003 },
    { name: "Bass, Hester and Mcclain", country: "Uzbekistan", industry: "Computer Hardware", number_of_employees: 2762, founded: 1994 },
    { name: "Strickland, Gray and Jensen", country: "Israel", industry: "Performing Arts", number_of_employees: 7020, founded: 1987 },
    { name: "Sparks, Decker and Powell", country: "Israel", industry: "Marketing / Advertising / Sales", number_of_employees: 2709, founded: 1977 },
    { name: "Osborn, Ford and Macdonald", country: "Syrian Arab Republic", industry: "Investment Banking / Venture", number_of_employees: 5731, founded: 1990 },
    { name: "Gonzales Inc", country: "Angola", industry: "Capital Markets / Hedge Fund / Private Equity", number_of_employees: 2252, founded: 2019 },
    { name: "Ballard, Goodman and Boone", country: "Iran", industry: "Logistics / Procurement", number_of_employees: 6165, founded: 2019 },
    { name: "Bernard, Payne and Spencer", country: "Afghanistan", industry: "Transportation", number_of_employees: 730, founded: 1990 },
    { name: "Mcpherson-Blanchard", country: "Bulgaria", industry: "Law Enforcement", number_of_employees: 9890, founded: 1972 },
    { name: "Koch, Gomez and Hays", country: "French Southern Territories", industry: "Financial Services", number_of_employees: 8497, founded: 1997 },
    { name: "Meza, Ramirez and Braun", country: "Timor-Leste", industry: "Public Relations / PR", number_of_employees: 5205, founded: 2012 },
    { name: "Morales, Hinton and Gibbs", country: "Serbia", industry: "Museums / Institutions", number_of_employees: 6706, founded: 2014 },
    { name: "Abbott-Arroyo", country: "Hungary", industry: "Architecture / Planning", number_of_employees: 117, founded: 1994 },
    { name: "Trevino-Foley", country: "Canada", industry: "Wine / Spirits", number_of_employees: 6765, founded: 1973 },
    { name: "Bowman, Walters and Sawyer", country: "Yemen", industry: "Think Tanks", number_of_employees: 5926, founded: 1988 }
  ]);
  
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const getTopCountriesByEmployees = () => {
    const countryData = {};
    rawData.forEach(company => {
      if (!countryData[company.country]) {
        countryData[company.country] = { 
          country: company.country, 
          totalEmployees: 0, 
          companies: 0,
          avgEmployees: 0
        };
      }
      countryData[company.country].totalEmployees += company.number_of_employees;
      countryData[company.country].companies += 1;
    });
    
    return Object.values(countryData)
      .map(item => ({
        ...item,
        avgEmployees: Math.round(item.totalEmployees / item.companies)
      }))
      .sort((a, b) => b.totalEmployees - a.totalEmployees)
      .slice(0, 10);
  };

  const getTopIndustriesByEmployees = () => {
    const industryData = {};
    rawData.forEach(company => {
      if (!industryData[company.industry]) {
        industryData[company.industry] = { 
          industry: company.industry, 
          totalEmployees: 0, 
          companies: 0,
          avgEmployees: 0
        };
      }
      industryData[company.industry].totalEmployees += company.number_of_employees;
      industryData[company.industry].companies += 1;
    });
    
    return Object.values(industryData)
      .map(item => ({
        ...item,
        avgEmployees: Math.round(item.totalEmployees / item.companies)
      }))
      .sort((a, b) => b.totalEmployees - a.totalEmployees)
      .slice(0, 10);
  };

  const getTopCompanies = () => {
    return rawData
      .sort((a, b) => b.number_of_employees - a.number_of_employees)
      .slice(0, 10);
  };

  const getCompanyAgeAnalysis = () => {
    const currentYear = 2024;
    return rawData.map(company => ({
      name: company.name,
      age: currentYear - company.founded,
      employees: company.number_of_employees,
      industry: company.industry
    })).sort((a, b) => b.age - a.age);
  };

  const getIndustryGrowthByDecade = () => {
    const decades = {};
    rawData.forEach(company => {
      const decade = Math.floor(company.founded / 10) * 10;
      if (!decades[decade]) {
        decades[decade] = { decade: `${decade}s`, companies: 0, totalEmployees: 0 };
      }
      decades[decade].companies += 1;
      decades[decade].totalEmployees += company.number_of_employees;
    });
    
    return Object.values(decades).sort((a, b) => a.decade.localeCompare(b.decade));
  };

  const getKeyMetrics = () => {
    const totalEmployees = rawData.reduce((sum, company) => sum + company.number_of_employees, 0);
    const totalCompanies = rawData.length;
    const avgEmployees = Math.round(totalEmployees / totalCompanies);
    const uniqueCountries = new Set(rawData.map(c => c.country)).size;
    const uniqueIndustries = new Set(rawData.map(c => c.industry)).size;
    
    const oldestCompany = rawData.reduce((oldest, company) => 
      company.founded < oldest.founded ? company : oldest
    );
    const newestCompany = rawData.reduce((newest, company) => 
      company.founded > newest.founded ? company : newest
    );
    const largestCompany = rawData.reduce((largest, company) => 
      company.number_of_employees > largest.number_of_employees ? company : largest
    );

    return {
      totalEmployees,
      totalCompanies,
      avgEmployees,
      uniqueCountries,
      uniqueIndustries,
      oldestCompany,
      newestCompany,
      largestCompany
    };
  };

  const topCountries = getTopCountriesByEmployees();
  const topIndustries = getTopIndustriesByEmployees();
  const topCompanies = getTopCompanies();
  const companyAges = getCompanyAgeAnalysis();
  const growthByDecade = getIndustryGrowthByDecade();
  const metrics = getKeyMetrics();

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

  const renderOverview = () => (
    <div className="overview-container">
      <div className="metrics-grid">
        <div className="metric-card metric-card-blue">
          <div className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Total Employees</p>
              <p className="metric-value">{metrics.totalEmployees.toLocaleString()}</p>
            </div>
            <Users className="metric-icon" />
          </div>
        </div>
        <div className="metric-card metric-card-green">
          <div className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Companies</p>
              <p className="metric-value">{metrics.totalCompanies}</p>
            </div>
            <Building className="metric-icon" />
          </div>
        </div>
        <div className="metric-card metric-card-purple">
          <div className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Countries</p>
              <p className="metric-value">{metrics.uniqueCountries}</p>
            </div>
            <Globe className="metric-icon" />
          </div>
        </div>
        <div className="metric-card metric-card-orange">
          <div className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Industries</p>
              <p className="metric-value">{metrics.uniqueIndustries}</p>
            </div>
            <Target className="metric-icon" />
          </div>
        </div>
        <div className="metric-card metric-card-red">
          <div className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Avg Employees</p>
              <p className="metric-value">{metrics.avgEmployees.toLocaleString()}</p>
            </div>
            <TrendingUp className="metric-icon" />
          </div>
        </div>
      </div>

      <div className="highlight-grid">
        <div className="highlight-card">
          <h3 className="highlight-title">
            <Award className="highlight-icon highlight-icon-yellow" />
            Largest Company
          </h3>
          <div className="highlight-content">
            <p className="highlight-name">{metrics.largestCompany.name}</p>
            <p className="highlight-detail">{metrics.largestCompany.industry}</p>
            <p className="highlight-detail">{metrics.largestCompany.country}</p>
            <p className="highlight-employees">{metrics.largestCompany.number_of_employees.toLocaleString()} employees</p>
          </div>
        </div>
        <div className="highlight-card">
          <h3 className="highlight-title">
            <Calendar className="highlight-icon highlight-icon-blue" />
            Oldest Company
          </h3>
          <div className="highlight-content">
            <p className="highlight-name">{metrics.oldestCompany.name}</p>
            <p className="highlight-detail">{metrics.oldestCompany.industry}</p>
            <p className="highlight-detail">{metrics.oldestCompany.country}</p>
            <p className="highlight-founded">Founded {metrics.oldestCompany.founded}</p>
          </div>
        </div>
        <div className="highlight-card">
          <h3 className="highlight-title">
            <TrendingUp className="highlight-icon highlight-icon-green" />
            Newest Company
          </h3>
          <div className="highlight-content">
            <p className="highlight-name">{metrics.newestCompany.name}</p>
            <p className="highlight-detail">{metrics.newestCompany.industry}</p>
            <p className="highlight-detail">{metrics.newestCompany.country}</p>
            <p className="highlight-founded-orange">Founded {metrics.newestCompany.founded}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Top Countries by Total Employees</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountries.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Bar dataKey="totalEmployees" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Top Industries by Total Employees</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topIndustries.slice(0, 5)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ industry, percent }) => `${industry} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="totalEmployees"
              >
                {topIndustries.slice(0, 5).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderCountryAnalysis = () => (
    <div className="analysis-container">
      <div className="analysis-card">
        <h3 className="analysis-title">
          <Globe className="analysis-icon analysis-icon-blue" />
          Country Analysis - Employee Distribution
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topCountries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={100} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [value.toLocaleString(), name]}
              labelFormatter={(label) => `Country: ${label}`}
            />
            <Legend />
            <Bar dataKey="totalEmployees" fill="#3b82f6" name="Total Employees" />
            <Bar dataKey="companies" fill="#10b981" name="Number of Companies" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="analysis-card">
        <h3 className="analysis-title">Country Rankings</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Rank</th>
                <th className="table-header">Country</th>
                <th className="table-header">Total Employees</th>
                <th className="table-header">Companies</th>
                <th className="table-header">Avg Employees</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.map((country, index) => (
                <tr key={country.country} className="table-row">
                  <td className="table-cell table-cell-rank">{index + 1}</td>
                  <td className="table-cell">{country.country}</td>
                  <td className="table-cell table-cell-employees">{country.totalEmployees.toLocaleString()}</td>
                  <td className="table-cell">{country.companies}</td>
                  <td className="table-cell">{country.avgEmployees.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIndustryAnalysis = () => (
    <div className="analysis-container">
      <div className="analysis-card">
        <h3 className="analysis-title">
          <Building className="analysis-icon analysis-icon-purple" />
          Industry Analysis - Employee Distribution
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topIndustries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="industry" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={120} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [value.toLocaleString(), name]}
              labelFormatter={(label) => `Industry: ${label}`}
            />
            <Legend />
            <Bar dataKey="totalEmployees" fill="#8b5cf6" name="Total Employees" />
            <Bar dataKey="avgEmployees" fill="#ec4899" name="Avg Employees per Company" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="analysis-card">
        <h3 className="analysis-title">Industry Rankings</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Rank</th>
                <th className="table-header">Industry</th>
                <th className="table-header">Total Employees</th>
                <th className="table-header">Companies</th>
                <th className="table-header">Avg Employees</th>
              </tr>
            </thead>
            <tbody>
              {topIndustries.map((industry, index) => (
                <tr key={industry.industry} className="table-row">
                  <td className="table-cell table-cell-rank">{index + 1}</td>
                  <td className="table-cell">{industry.industry}</td>
                  <td className="table-cell table-cell-industry">{industry.totalEmployees.toLocaleString()}</td>
                  <td className="table-cell">{industry.companies}</td>
                  <td className="table-cell">{industry.avgEmployees.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCompanyAnalysis = () => (
    <div className="analysis-container">
      <div className="analysis-card">
        <h3 className="analysis-title">
          <Award className="analysis-icon analysis-icon-yellow" />
          Top Companies by Employee Count
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topCompanies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={120} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), "Employees"]}
              labelFormatter={(label) => `Company: ${label}`}
            />
            <Bar dataKey="number_of_employees" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="analysis-card">
        <h3 className="analysis-title">Company Age vs Employee Count</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={companyAges}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" tick={{ fontSize: 12 }} name="Company Age" />
            <YAxis dataKey="employees" tick={{ fontSize: 12 }} name="Employees" />
            <Tooltip 
              formatter={(value, name) => [
                name === "employees" ? value.toLocaleString() : value, 
                name === "employees" ? "Employees" : "Age (years)"
              ]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ""}
            />
            <Scatter dataKey="employees" fill="#06b6d4" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTimeAnalysis = () => (
    <div className="analysis-container">
      <div className="analysis-card">
        <h3 className="analysis-title">
          <Calendar className="analysis-icon analysis-icon-green" />
          Company Formation by Decade
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={growthByDecade}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="decade" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="companies" fill="#10b981" name="Companies Founded" />
            <Line yAxisId="right" type="monotone" dataKey="totalEmployees" stroke="#3b82f6" name="Total Employees" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="analysis-card">
        <h3 className="analysis-title">Historical Timeline</h3>
        <div className="timeline-container">
          {growthByDecade.map((decade, index) => (
            <div key={decade.decade} className="timeline-item">
              <div className="timeline-decade">
                <span className="timeline-decade-text">{decade.decade}</span>
              </div>
              <div className="timeline-content">
                <div className="timeline-stats">
                  <span className="timeline-companies">{decade.companies} companies founded</span>
                  <span className="timeline-employees">{decade.totalEmployees.toLocaleString()} total employees</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">Business Analytics Dashboard</h1>
            <p className="header-subtitle">Comprehensive analysis of company data across industries and regions</p>
          </div>
          <div className="header-actions">
         
          </div>
        </div>
      </div>

      <div className="dashboard-navigation">
        <div className="nav-content">
          <div className="nav-items">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'countries', label: 'Countries', icon: Globe },
              { id: 'industries', label: 'Industries', icon: Building },
              { id: 'companies', label: 'Companies', icon: Award },
              { id: 'timeline', label: 'Timeline', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id)}
                className={`nav-button ${selectedView === id ? 'nav-button-active' : 'nav-button-inactive'}`}
              >
                <Icon className="nav-icon" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {selectedView === 'overview' && renderOverview()}
        {selectedView === 'countries' && renderCountryAnalysis()}
        {selectedView === 'industries' && renderIndustryAnalysis()}
        {selectedView === 'companies' && renderCompanyAnalysis()}
        {selectedView === 'timeline' && renderTimeAnalysis()}
      </div>
    </div>
  );
};

export default BusinessAnalyticsDashboard;

