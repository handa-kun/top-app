import { Button, Htag } from './../components';


export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Testing button</Htag>
      <Button appearance='primary' arrow='right'>Subscribe</Button>
      <Button appearance='ghost' arrow='down'>Subscribe</Button>
    </>
  );
}