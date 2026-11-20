
function MyThing() {
  return <div>Zorro</div>
}

import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen, waitFor} from '@testing-library/react';

describe("mysuite1", () => {
  it("test_add 1", () => {
    //expect(10 + 20).toBeGreaterThanOrEqual(30)
    expect(10 + 21).toBe(31)
  })
  it("test_add 2", () => {
    expect(1E16 + 1).toBe(1E16)
  })
  it("reacttest", async () => {
    render(<MyThing/>)
    await waitFor(() => {
        const matcher = expect(screen.getByText("Zorro"))
        matcher.toBeInTheDocument()
    })
})})

