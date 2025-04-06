import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginButton from "../LoginButton";
import * as nextAuth from "next-auth/react";

vi.mock("next-auth/react", ()=>({
    signIn: vi.fn(),
}));    

describe('LoginButton component', ()=>{
    it('Render Button with correct text',()=>{
        render(<LoginButton/>);
        expect(screen.getByRole("button")).toHaveTextContent("Sign in with Google");
    })

    it("Calls signIn when clicked", async ()=>{
        const mockedSignIn = nextAuth.signIn as jest.MockedFunction<typeof nextAuth.signIn>;
        render(<LoginButton/>);
        await userEvent.click(screen.getByRole("button"));
        expect(mockedSignIn).toHaveBeenCalledWith("google");;
    })
})