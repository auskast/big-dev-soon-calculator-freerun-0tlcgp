import { Buttons } from "./Buttons";
import { Container } from "./Container";
import { Display } from "./Display";
import { Header } from "./Header";

export const Calculator = () => {
  return (
    <Container>
      <Header />
      <Display />
      <Buttons />
    </Container>
  );
};
