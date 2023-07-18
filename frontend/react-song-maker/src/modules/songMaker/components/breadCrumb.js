import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = () => {
  const currentPath = window.location.hash;

  const breadcrumbs = [
    {
      name: 'Tone select',
      path: '#/create-song/tone',
    },
    {
      name: 'Rhythm select',
      path: '#/rhythm-selector',
    },
    {
      name: 'Results',
      path: '#/results',
    },
  ];

  return (
    <nav className='c-navigation-breadcrumbs' aria-label='Breadcrumb'>
      <ol className='c-navigation-breadcrumbs__directory'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            className={`c-navigation-breadcrumbs__item ${
              currentPath === breadcrumb.path
                ? 'c-navigation-breadcrumbs__active'
                : ''
            }`}
            key={index}
          >
            <Link
              className='c-navigation-breadcrumbs__link'
              to={`${breadcrumb.path.slice(1, breadcrumb.path.length)}`}
              replace
            >
              {breadcrumb.name}
            </Link>
            <meta property='position' content={index + 1} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
