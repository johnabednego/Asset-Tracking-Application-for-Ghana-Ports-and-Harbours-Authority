import { Helmet } from 'react-helmet-async';

import { EmployeeView } from 'src/sections/employee/view';

// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title>Employees</title>
      </Helmet>

      <EmployeeView />
    </>
  );
}
