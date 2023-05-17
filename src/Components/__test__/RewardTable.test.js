import {
    render,
    screen,
    act,
    within,
    logRoles,
} from "@testing-library/react";

import RewardTable from "../RewardTable";

describe("RewardTable Test", () => {
    beforeAll(() => {
        jest.mock("../__mocks__/axios.js");
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("The table component should be rendered on the screen.", async () => {
        await act(async () =>
            render(<RewardTable dataUrl="./mockapi" />)
        );
        const tableElement = await screen.findByTestId("table");
        logRoles(tableElement);
        expect(tableElement).toBeInTheDocument();
    });

    it("Should have made requests successfully and have the correct number of rows", async () => {
        await act(async () =>
            render(<RewardTable dataUrl="./mockapi" />)
        );

        const tableElement = await screen.findByTestId("table");
        const rows = await within(tableElement).findAllByRole("row");
        expect(rows).toHaveLength(4);
    });

    it("The table should have the correct value on each row after calculating.", async () => {
        await act(async () =>
            render(<RewardTable dataUrl="./mockapi" />)
        );
        const tableElement = await screen.findByTestId("table");
        const rows = await within(tableElement).findAllByRole("row");
        expect(rows[0]).toHaveTextContent("February");
        expect(rows[1]).toHaveTextContent("266");
        expect(rows[2]).toHaveTextContent("178");
        expect(rows[3]).toHaveTextContent("154");
    });
});
