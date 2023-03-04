import axios from "axios";

export const constants = {
  backend_service: process.env.REACT_APP_BACKEND_SERVICE,
};

export const requester = async (connection_object, url, enable_compare = false) => {
  const data = new FormData();
  if (enable_compare) {
    data.append("generate_scripts", connection_object.generate_scripts);
    data.append("src_host", connection_object.src.host);
    data.append("src_port", connection_object.src.port);
    data.append("src_user", connection_object.src.username);
    data.append("src_passwd", connection_object.src.password);
    data.append("src_dbname", connection_object.src.dbname ? connection_object.src.dbname : "postgres");
    data.append("src_schema", connection_object.src.schema);
    data.append("src_table", connection_object.src.table);
    if (connection_object.src.use_tunnel) {
      data.append("src_use_tunnel", connection_object.src.use_tunnel);
      data.append("src_tunnel_host", connection_object.src.ssh_host);
      data.append("src_tunnel_port", connection_object.src.ssh_port);
      data.append("src_tunnel_user", connection_object.src.ssh_user);
      data.append("src_tunnel_key", connection_object.src.ssh_key);
    }
    data.append("dest_host", connection_object.dest.host);
    data.append("dest_port", connection_object.dest.port);
    data.append("dest_user", connection_object.dest.username);
    data.append("dest_passwd", connection_object.dest.password);
    data.append("dest_dbname", connection_object.dest.dbname ? connection_object.dest.dbname : "postgres");
    data.append("dest_schema", connection_object.dest.schema);
    data.append("dest_table", connection_object.dest.table);
    if (connection_object.dest.use_tunnel) {
      data.append("dest_use_tunnel", connection_object.dest.use_tunnel);
      data.append("dest_tunnel_host", connection_object.dest.ssh_host);
      data.append("dest_tunnel_port", connection_object.dest.ssh_port);
      data.append("dest_tunnel_user", connection_object.dest.ssh_user);
      data.append("dest_tunnel_key", connection_object.dest.ssh_key);
    }
  } else {
    data.append("host", connection_object.host);
    data.append("port", connection_object.port);
    data.append("user", connection_object.username);
    data.append("passwd", connection_object.password);
    data.append("dbname", connection_object.dbname ? connection_object.dbname : "postgres");
    data.append("schema", connection_object.schema);
    if (connection_object.use_tunnel) {
      data.append("use_tunnel", connection_object.use_tunnel);
      data.append("tunnel_host", connection_object.ssh_host);
      data.append("tunnel_port", connection_object.ssh_port);
      data.append("tunnel_user", connection_object.ssh_user);
      data.append("tunnel_key", connection_object.ssh_key);
    }
  }
  const config = {
    method: "POST",
    url,
    data: data,
  };
  const response = axios(config);
  return response;
};

export const tableStructure = {
  column_name: "Column name",
  type: "Type",
  is_nullable: "Is nullable",
  maximum_length: "Maximum length",
};
