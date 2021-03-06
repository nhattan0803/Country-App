import { GetStaticProps } from 'next';
import { useState } from 'react';
import CountryCard from '../components/CountryCard';
import Header from '../components/Header';
import Layout from '../components/Layout';
import RegionList from '../components/RegionList';
import Pagination from "../components/pagination"


export default function Home({ allCountries }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [postPerpage, setPostPerPage] = useState(15);
  const [currentPage, setCurrenPage] = useState(1);

  const indexOfLasPost = currentPage * postPerpage;
  const indexOfFirstPost = indexOfLasPost - postPerpage;


  const handleSearchFilter = (e) => {
    e.preventDefault();
    setSearchFilter(e.target.value.toLowerCase());
  };

  const handleRegionFilter = (region) => setSearchFilter(region);

  const searchedCountries = allCountries.filter(
    country =>
      country.name.toLowerCase().includes(searchFilter) ||
      country.region.toLowerCase().includes(searchFilter)
  );

  const currenPost = searchedCountries.slice(indexOfFirstPost, indexOfLasPost);
  const paginate = (pageNumber) => setCurrenPage(pageNumber);

  return (
    <>
      <Header handleSearchFilter={handleSearchFilter} />
      <Layout title='Home'>
        <RegionList handleRegionFilter={handleRegionFilter} />
        <h3 className='font-bold text-xl pr-10 py-10'>
          Displaying:{' '}
          <span className='text-green-500'>
            {searchFilter.length ? searchFilter : 'all'}
          </span>
        </h3>
        {searchedCountries.length ? (
          <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {currenPost.map(country => (
              <CountryCard
                key={country.name}
                flag={country.flag}
                name={country.name}
                region={country.region}
                capital={country.capital}
                alpha3Code={country.alpha3Code}
              />
            ))}
          </ul>
        ) : (
          <div className='py-10'>
            <h2 className='text-6xl font-bold'>
              No Countries match{' '}
              <span className='text-green-500'>{searchFilter}</span>
            </h2>
          </div>
        )}
        <Pagination postPerpage={postPerpage} totalPage={searchedCountries.length} paginate={paginate} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const allCountries = await res.json();
    return {
      props: {
        allCountries,
      },
    };
  } catch (err) {
    console.error(err);
  }
};
