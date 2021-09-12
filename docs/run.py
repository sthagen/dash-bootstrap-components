from werkzeug.middleware.dispatcher import DispatcherMiddleware

from components_page import register_apps as register_component_apps  # noqa
from demos import register_apps as register_demo_apps  # noqa
from examples import register_apps as register_example_apps  # noqa
from markdown_to_html import convert_all_markdown_files  # noqa
from server import create_server  # noqa

convert_all_markdown_files()

server = create_server()
component_routes = register_component_apps()
example_routes = register_example_apps()
demo_routes = register_demo_apps()
routes = {**component_routes, **example_routes, **demo_routes}
application = DispatcherMiddleware(
    server, {slug: app.server for slug, app in routes.items()}
)

if __name__ == "__main__":
    import os

    from werkzeug.serving import run_simple

    os.environ["DBC_DOCS_MODE"] = "dev"
    run_simple("localhost", 8888, application, use_reloader=True)
