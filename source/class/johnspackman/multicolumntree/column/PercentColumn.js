/* ************************************************************************
 *
 *    multicolumntree - Multi Column Tree Contrib for Qooxdoo
 *
 *    https://github.com/qooxdoo/qooxdoo-compiler
 *
 *    Copyright:
 *      2012-2018 Zenesis Limited, http://www.zenesis.com
 *
 *    License:
 *      MIT: https://opensource.org/licenses/MIT
 *
 *      This software is provided under the same licensing terms as Qooxdoo,
 *      please see the LICENSE file in the Qooxdoo project's top-level directory
 *      for details.
 *
 *    Authors:
 *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
 *
 * ************************************************************************/

qx.Class.define("johnspackman.multicolumntree.column.PercentColumn", {
  extend: johnspackman.multicolumntree.column.Column,

  construct: function(caption, valuePath, width) {
    this.base(arguments, caption, valuePath, width);
    this.setNumberFormat(new qx.util.format.NumberFormat().set({ postfix: "%" }));
  },

  properties: {
    numberFormat: {
      init: null,
      nullable: true,
      check: "qx.util.format.NumberFormat"
    }
  },

  members: {
    getDisplayValue: function(model) {
      var value = this.base(arguments, model);
      if (!value)
        value = 0;
      var nf = this.getNumberFormat();
      return nf.format(value * 100.0);
    },

    getEditedValue: function() {
      var str = this.getEditWidget().getValue();
      str = str.replace(/[^0-9.]/g, '');
      var value = parseFloat(str);
      return value / 100.0;
    },

    compare: function(left, right) {
      left = this.getRawValue(left);
      right = this.getRawValue(right);
      return left < right ? -1 : left > right ? 1 : 0;
    }

  }
});
