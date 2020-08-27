// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/kundalis/kundalisActions";
import * as uiHelpers from "../KundalisUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useKundalisUIContext } from "../KundalisUIContext";

export function KundalisTable() {
  // Kundalis UI Context
  const kundalisUIContext = useKundalisUIContext();
  const kundalisUIProps = useMemo(() => {
    return {
      ids: kundalisUIContext.ids,
      setIds: kundalisUIContext.setIds,
      queryParams: kundalisUIContext.queryParams,
      setQueryParams: kundalisUIContext.setQueryParams,
      openEditKundaliPage: kundalisUIContext.openEditKundaliPage,
      openDeleteKundaliDialog: kundalisUIContext.openDeleteKundaliDialog,
    };
  }, [kundalisUIContext]);

  // Getting curret state of kundalis list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.kundalis }),
    shallowEqual,
  );
  console.log("Kundali Table")
  console.log(currentState)
  const { totalCount, entities, listLoading } = currentState;
  // Kundalis Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    kundalisUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchKundalis(kundalisUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kundalisUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "VINCode",
      text: "VIN Code (ID)",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "manufacture",
      text: "Manufacture",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "model",
      text: "Model",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "modelYear",
      text: "Model Year",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "color",
      text: "Color",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.ColorColumnFormatter,
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.PriceColumnFormatter,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "condition",
      text: "Condition",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.ConditionColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditKundaliPage: kundalisUIProps.openEditKundaliPage,
        openDeleteKundaliDialog: kundalisUIProps.openDeleteKundaliDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: kundalisUIProps.queryParams.pageSize,
    page: kundalisUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  kundalisUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: kundalisUIProps.ids,
                  setIds: kundalisUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
