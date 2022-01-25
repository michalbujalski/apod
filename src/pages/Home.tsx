import { generateUniqueDate } from '../helpers';

const Home = () => {
  const date = generateUniqueDate([]);
  return <div>{date}</div>;
};

export default Home;
