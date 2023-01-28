import { Button, Htag } from './../components';


export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Testing button</Htag>
      <Button appearance='primary'>Subscribe</Button>
      <Button appearance='ghost'>Subscribe</Button>
    </>
  );
}