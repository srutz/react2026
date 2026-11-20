import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { renderToString } from "react-dom/server"

import styled from "styled-components"
import css from "./App.module.css"
console.log("css", css)

const MyButton2Styled = styled.button`
  padding: 8px;
  background-color: #cf0000;
  color: white;
`

function MyButton3({ children, ...props } : { 
  children: ReactNode } & ComponentProps<"button">) 
{
  return <button className={`${css.mybutton}`} {...props}>
    {children}
  </button>
}

function MyButton2({ children, ...props } : { 
  children: ReactNode } & ComponentProps<"button">) 
{
  return <MyButton2Styled {...props}>
    {children}
  </MyButton2Styled>
}


function MyButton({ children, ...props } : { 
  children: ReactNode } & ComponentProps<"button">) 
{
  const style : CSSProperties = {
    border: "1px solid red",
    backgroundColor: "#cf0000",
    padding: "8px",
  }
  return <button style={style} {...props}>
    {children}
  </button>
}


export function App() {
	return (
  	<div className="flex flex-col overflow-y-auto items-start gap-2">
      <MyButton>Click me</MyButton>
      <MyButton2>Click me</MyButton2>
      <MyButton3>Click me</MyButton3>
		</div>
	);
}

const s = renderToString(<App></App>)
console.log(s);


