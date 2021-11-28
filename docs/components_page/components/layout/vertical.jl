using DashBootstrapComponents

row = html_div(
    [
        dbc_row(
            [
                dbc_col(html_div("One of three columns")),
                dbc_col(html_div("One of three columns")),
                dbc_col(html_div("One of three columns")),
            ],
            align = "start",
        ),
        dbc_row(
            [
                dbc_col(html_div("One of three columns")),
                dbc_col(html_div("One of three columns")),
                dbc_col(html_div("One of three columns")),
            ],
            align = "center",
        ),
        dbc_row(
            [
                dbc_col(html_div("One of three columns")),
                dbc_col(html_div("One of three columns")),
                dbc_col(html_div("One of three columns")),
            ],
            align = "end",
        ),
        dbc_row([
            dbc_col(html_div("One of three columns"), align = "start"),
            dbc_col(html_div("One of three columns"), align = "center"),
            dbc_col(html_div("One of three columns"), align = "end"),
        ]),
    ],
    className = "pad-row",
);
