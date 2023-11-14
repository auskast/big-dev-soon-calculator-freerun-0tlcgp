"use client";

import { Buttons } from "./Buttons";
import { CalculatorProvider } from "./CalculatorContext";
import { Container } from "./Container";
import { Display } from "./Display";
import { Header } from "./Header";

export const Calculator = () => {
  return (
    <CalculatorProvider>
      <Container>
        <Header />
        <Display />
        <Buttons />
      </Container>
    </CalculatorProvider>
  );
};
