import React, { useState } from 'react';
import './DataSource.css';

/**
 * Main Data Source Management Component
 * Handles listing, adding, and deleting data sources
 */
function DataSource() {
  // State for managing data sources
  const [dataSources, setDataSources] = useState([
    {
      id: 1,
      name: 'CSV',
      type: 'POSTGRES',
      owner: {
        name: 'Subhrajyoti',
        email: 'subhrad94@gmail.com',
        avatar: 'S'
      },
      createdOn: 'No Date'
    },
    {
      id: 2,
      name: 'CSV',
      type: 'POSTGRES',
      owner: {
        name: 'Subhrajyoti',
        email: 'subhrad94@gmail.com',
        avatar: 'S'
      },
      createdOn: 'No Date'
    },
    {
      id: 3,
      name: 'demo_db',
      type: 'POSTGRES',
      owner: {
        name: 'Subhrajyoti',
        email: 'subhrad94@gmail.com',
        avatar: 'S'
      },
      createdOn: 'No Date'
    }
  ]);

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    sourceName: '',
    host: '',
    port: '',
    databaseName: '',
    username: '',
    password: '',
    databaseType: 'PostgreSQL'
  });

  // State for form validation
  const [showValidation, setShowValidation] = useState(false);

  /**
   * Handle opening the add data source modal
   */
  const handleAddDataSource = () => {
    setShowModal(true);
    setShowValidation(false);
    setFormData({
      sourceName: '',
      host: '',
      port: '',
      databaseName: '',
      username: 'subhrad94',
      password: '',
      databaseType: 'PostgreSQL'
    });
  };

  /**
   * Handle closing the modal
   */
  const handleCloseModal = () => {
    setShowModal(false);
    setShowValidation(false);
  };

  /**
   * Handle form input changes
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Validate required fields
   * @returns {boolean} - True if all required fields are filled
   */
  const validateForm = () => {
    const required = ['sourceName', 'host', 'port', 'username', 'password'];
    return required.every(field => formData[field].trim() !== '');
  };

  /**
   * Handle test connection button click
   */
  const handleTestConnection = () => {
    if (!validateForm()) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    // Simulate test connection
    alert('Connection test successful!');
  };

  /**
   * Handle add data source form submission
   */
  const handleSubmitDataSource = () => {
    if (!validateForm()) {
      setShowValidation(true);
      return;
    }

    const newDataSource = {
      id: Date.now(),
      name: formData.sourceName,
      type: 'POSTGRES',
      owner: {
        name: 'Subhrajyoti',
        email: 'subhrad94@gmail.com',
        avatar: 'S'
      },
      createdOn: new Date().toLocaleDateString()
    };

    setDataSources(prev => [...prev, newDataSource]);
    setShowModal(false);
    setShowValidation(false);
  };

  /**
   * Handle deleting a data source
   * @param {number} id - Data source ID to delete
   */
  const handleDeleteDataSource = (id) => {
    if (window.confirm('Are you sure you want to delete this data source?')) {
      setDataSources(prev => prev.filter(source => source.id !== id));
    }
  };

  return (
    <div className="data-source-container">
      {/* Header Section */}
      <div className="data-source-header">
        <div className="header-content">
          <h1>Data Sources</h1>
          <p className="header-subtitle">Manage your data sources and database connections</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <span className="sources-count">{dataSources.length} sources configured</span>
        <button className="add-source-btn" onClick={handleAddDataSource}>
          <span className="plus-icon">+</span>
          Add Data Source
        </button>
      </div>

      {/* Data Sources Table */}
      <div className="data-sources-table-container">
        <div className="table-header">
          <div className="table-icon">📊</div>
          <h3>Configured Data Sources</h3>
        </div>

        <div className="data-table">
          <div className="table-header-row">
            <div className="table-cell header-cell">Source Name</div>
            <div className="table-cell header-cell">Type</div>
            <div className="table-cell header-cell">Owner</div>
            <div className="table-cell header-cell">Created On</div>
            <div className="table-cell header-cell">Actions</div>
          </div>

          {dataSources.map((source) => (
            <DataSourceRow
              key={source.id}
              source={source}
              onDelete={handleDeleteDataSource}
            />
          ))}

          {dataSources.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p>No data sources configured yet</p>
              <button className="add-source-btn" onClick={handleAddDataSource}>
                Add Your First Data Source
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Data Source Modal */}
      {showModal && (
        <AddDataSourceModal
          formData={formData}
          showValidation={showValidation}
          onInputChange={handleInputChange}
          onTestConnection={handleTestConnection}
          onSubmit={handleSubmitDataSource}
          onClose={handleCloseModal}
          existingSources={dataSources}
        />
      )}
    </div>
  );
}

/**
 * Data Source Row Component
 * Renders individual data source entries in the table
 */
function DataSourceRow({ source, onDelete }) {
  return (
    <div className="table-row">
      <div className="table-cell source-name-cell">
        <div className="source-icon">📊</div>
        <span className="source-name">{source.name}</span>
      </div>
      <div className="table-cell">
        <span className="type-badge">{source.type}</span>
      </div>
      <div className="table-cell owner-cell">
        <div className="owner-info">
          <div className="owner-avatar">{source.owner.avatar}</div>
          <div className="owner-details">
            <div className="owner-name">{source.owner.name}</div>
            <div className="owner-email">{source.owner.email}</div>
          </div>
        </div>
      </div>
      <div className="table-cell">
        <span className="created-date">{source.createdOn}</span>
      </div>
      <div className="table-cell actions-cell">
        <button 
          className="delete-btn"
          onClick={() => onDelete(source.id)}
          title="Delete data source"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

/**
 * Add Data Source Modal Component
 * Modal form for adding new data sources
 */
function AddDataSourceModal({ 
  formData, 
  showValidation, 
  onInputChange, 
  onTestConnection, 
  onSubmit, 
  onClose,
  existingSources 
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <button className="cancel-btn" onClick={onClose}>
            <span className="close-icon">✕</span>
            Cancel
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <div className="modal-title-section">
            <div className="modal-icon">📊</div>
            <div>
              <h2>Configure New Data Source</h2>
              <p className="modal-subtitle">Connect to your database or upload Excel/CSV files</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sourceName">
                  Source Name <span className="required">*</span>
                </label>
                <input
                  id="sourceName"
                  name="sourceName"
                  type="text"
                  placeholder="Enter a descriptive name"
                  value={formData.sourceName}
                  onChange={onInputChange}
                  className={showValidation && !formData.sourceName ? 'error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="databaseType">Database Type</label>
                <select
                  id="databaseType"
                  name="databaseType"
                  value={formData.databaseType}
                  onChange={onInputChange}
                >
                  <option value="PostgreSQL">PostgreSQL</option>
                  <option value="MySQL">MySQL</option>
                  <option value="MongoDB">MongoDB</option>
                  <option value="Oracle">Oracle</option>
                  <option value="SQL Server">SQL Server</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="host">
                  Host <span className="required">*</span>
                </label>
                <input
                  id="host"
                  name="host"
                  type="text"
                  placeholder="Database host address"
                  value={formData.host}
                  onChange={onInputChange}
                  className={showValidation && !formData.host ? 'error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="port">
                  Port <span className="required">*</span>
                </label>
                <input
                  id="port"
                  name="port"
                  type="text"
                  placeholder="Port number"
                  value={formData.port}
                  onChange={onInputChange}
                  className={showValidation && !formData.port ? 'error' : ''}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="databaseName">Database Name</label>
                <input
                  id="databaseName"
                  name="databaseName"
                  type="text"
                  placeholder="Database name (optional)"
                  value={formData.databaseName}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">
                  Username <span className="required">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={onInputChange}
                  className={showValidation && !formData.username ? 'error' : ''}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={onInputChange}
                  className={showValidation && !formData.password ? 'error' : ''}
                />
              </div>
            </div>
          </div>

          {/* Validation Message */}
          {showValidation && (
            <div className="validation-message">
              <div className="warning-icon">⚠️</div>
              <span>
                <strong>Required Information:</strong> Please fill in all required fields 
                (Source Name, Host, Port, Username, Password) before testing or submitting.
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button className="test-connection-btn" onClick={onTestConnection}>
              <span className="test-icon">🔧</span>
              Test Connection
            </button>
            <button className="add-source-btn-modal" onClick={onSubmit}>
              <span className="save-icon">💾</span>
              Add Data Source
            </button>
          </div>
        </div>

        {/* Existing Sources Preview */}
        {existingSources.length > 0 && (
          <div className="existing-sources-preview">
            <div className="preview-header">
              <div className="preview-icon">📊</div>
              <h4>Configured Data Sources</h4>
            </div>
            <div className="preview-table">
              <div className="preview-row preview-header-row">
                <span>Source Name</span>
                <span>Type</span>
                <span>Owner</span>
                <span>Created On</span>
                <span>Actions</span>
              </div>
              {existingSources.slice(0, 1).map((source) => (
                <div key={source.id} className="preview-row">
                  <div className="preview-source">
                    <span className="preview-icon">📊</span>
                    <span>{source.name}</span>
                  </div>
                  <span className="preview-type">{source.type}</span>
                  <div className="preview-owner">
                    <span className="preview-avatar">{source.owner.avatar}</span>
                    <div>
                      <div>{source.owner.name}</div>
                      <div className="preview-email">{source.owner.email}</div>
                    </div>
                  </div>
                  <span>{source.createdOn}</span>
                  <button className="preview-delete">🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataSource;