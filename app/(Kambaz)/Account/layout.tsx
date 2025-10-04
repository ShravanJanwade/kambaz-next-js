import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td
              valign="top"
              className="d-none d-md-table-cell"
              style={{ verticalAlign: "top" }}
            >
              <AccountNavigation />
            </td>

            <td valign="top" width="100%" style={{ verticalAlign: "top" }}>
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
