import React from 'react';
import './TableofContents.css';

function TableofContents({ isOpen, onToggle, items = [] }) {
  return (
    <div className={`table-of-contents ${isOpen ? 'open' : 'closed'}`}>
      {/* Toggle Button: always visible */}
      <button className="toggle-button" onClick={onToggle}>
        {isOpen ? '←' : '→'}
      </button>

      {/* TOC Content */}
      <div className="content">
        {isOpen && <h2>Table of Contents</h2>}
        {isOpen && (
          <ul>
            {items.length > 0
              ? items.map((it, idx) => <li key={idx}>{it}</li>)
              : (
                <>
                  <li>Introduction to Loops</li>
                  <li>While Loops</li>
                  <li>For Loops</li>
                  <li>Do-While Loops</li>
                  <li>Nested Loops</li>
                  <li>Break and Continue</li>
                </>
              )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TableofContents;
