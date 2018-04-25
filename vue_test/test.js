var defenseExcel = /** @class */ (function () {
  function defenseExcel() {
  }
  //导出
  defenseExcel.SaveExecl = function (obj) {
    var tabledata = [], _itemdata = [], rowandcol = [], _rowcol = [];
    var listtable = $("" + obj + " #tableinfo");
    var firstrows = listtable.find("tr:eq(0)").find("th").length == 0 ? listtable.find("tr:eq(0)").find("td") : listtable.find("tr:eq(0)").find("th");
    var rowlenght = 0;
    $(firstrows).each(function () {
      rowlenght++;
      if ($(this).attr("colspan") != undefined) {
        $(this).attr("colspan").length == 0 ? 0 : rowlenght += +$(this).attr("colspan") - 1;
      }
    });
    for (var k = 0; k < rowlenght; k++) {
      _itemdata[k] = listtable.find("caption").html();
    }
    _rowcol[0] = -1;
    _rowcol[1] = 0;
    _rowcol[2] = 0;
    _rowcol[3] = rowlenght - 1;
    rowandcol[rowandcol.length] = _rowcol;
    _rowcol = [];
    tabledata[tabledata.length] = _itemdata;
    var trlist = listtable.find("tr");
    var rowx = -1, rowy = -1, rowhtml = "";
    $(trlist).each(function (i) {
      _itemdata = [];
      for (var k = 0; k < rowlenght; k++) {
        var strhtml = "";
        var item_th = $(this).find("th:eq(" + k + ")");
        var item_td = $(this).find("td:eq(" + k + ")");
        if (item_th.length == 1) {
          if (item_th.attr("rowspan") != undefined) {
            rowx = k;
            rowy = +item_th.attr("rowspan");
            rowhtml = item_th.html();
            _itemdata[k] = rowhtml;
            _rowcol[0] = i;
            _rowcol[1] = i + rowy;
            _rowcol[2] = k;
            _rowcol[3] = k;
            rowandcol[rowandcol.length] = _rowcol || 0;
            _rowcol = [];
            continue;
          }
          if (item_th.find("span").length != 0)
            strhtml += (item_th.find("span").attr("data-class") == "znj_item") ? "职能局" : "街道办";
          if (item_th.find("input").length != 0 && item_th.find("input").attr("type") != "checkbox")
            strhtml += item_th.find("input").val();
          if (item_th.find("span").length == 0 && item_th.find("input").length == 0)
            strhtml = item_th.html();
          if (k == rowx && rowy > 0) {
            _itemdata[k] = "";
            _itemdata[_itemdata.length] = strhtml;
            rowy--;
          }
          else {
            if (item_th.attr("colspan") != undefined) {
              _rowcol[0] = i;
              _rowcol[1] = i + 1;
              _rowcol[2] = k;
              _rowcol[3] = k + (+item_th.attr("colspan")) - 1;
              rowandcol[rowandcol.length] = _rowcol || 0;
              _rowcol = [];
              for (var a = 0; a < +item_th.attr("colspan"); a++) {
                if (strhtml == "") {
                  strhtml = item_th.html();
                }
                _itemdata[k + a] = strhtml;
              }
            }
            else {
              _itemdata[_itemdata.length] = strhtml;
            }
          }
        }
        if (item_td.length == 1) {
          if (item_td.attr("rowspan") != undefined) {
            rowx = k;
            rowy = +item_td.attr("rowspan");
            rowhtml = item_td.html();
            _itemdata[k] = rowhtml;
            _rowcol[0] = i;
            _rowcol[1] = i + rowy;
            _rowcol[2] = k;
            _rowcol[3] = k;
            rowandcol[rowandcol.length] = _rowcol || 0;
            _rowcol = [];
            continue;
          }
          if (item_td.find("span").length != 0)
            strhtml += item_td.find("span").html();
          if (item_td.find("input").length != 0)
            strhtml += item_td.find("input").val();
          if (item_td.find("span").length == 0 && item_td.find("input").length == 0)
            strhtml = item_td.html();
          if (k == rowx && rowy > 0) {
            _itemdata[k] = "";
            _itemdata[_itemdata.length] = strhtml;
            rowy--;
          }
          else {
            if (item_td.attr("colspan") != undefined) {
              _rowcol[0] = i;
              _rowcol[1] = i + 1;
              _rowcol[2] = k;
              _rowcol[3] = +item_th.attr("colspan") || 0;
              rowandcol[rowandcol.length] = _rowcol;
              _rowcol = [];
              for (var a = 0; a < +item_td.attr("colspan"); a++) {
                if (strhtml == "") {
                  strhtml = item_td.html();
                }
                _itemdata[k + a] = item_td.html();
              }
            }
            else {
              _itemdata[_itemdata.length] = strhtml;
            }
          }
        }
      }
      tabledata[tabledata.length] = _itemdata;
    });
    var client = Math.random().toString();
    var filename = $("#hisinfo span.active").html();
    if (filename == "" || filename == undefined) {
      filename = "宝安区台风暴雨防御工作落实情况报表";
    }
    if (obj == "#statistics") {
      filename = "宝安区台风暴雨防御工作落实情况报表";
    }
    $.post("../tools/ReportForm.ashx", { client: client, tabledata: JSON.stringify(tabledata), fileName: filename, rowandcol: JSON.stringify(rowandcol) }, function () {
      document.location = "../tools/ReportForm.ashx?client=" + client;
    });
  };
  return defenseExcel;
}());
