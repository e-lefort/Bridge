// @source /Collections/List.js

Bridge.Class.generic('Bridge.List$1', function (T) {
    var $$name = Bridge.Class.genericName('Bridge.List$1', T);

    return Bridge.Class.cache[$$name] || (Bridge.Class.cache[$$name] = Bridge.define($$name, {
        inherits: [Bridge.ICollection$1(T), Bridge.ICollection, Bridge.IList$1(T)],
        constructor: function (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                this.items = obj;
            } else if (Bridge.is(obj, Bridge.IEnumerable)) {
                this.items = Bridge.toArray(obj);
            } else {
                this.items = [];
            }
        },

        checkIndex: function (index) {
            if (index < 0 || index > (this.items.length - 1)) {
                throw new Bridge.ArgumentOutOfRangeException('Index out of range');
            }
        },

        getCount: function () {
            return this.items.length;
        },

        get: function (index) {
            this.checkIndex(index);

            return this.items[index];
        },

        getItem: function (index) {
            return this.get(index);
        },

        set: function (index, value) {
            this.checkReadOnly();
            this.checkIndex(index);
            this.items[index] = value;
        },

        setItem: function (index, value) {
            this.set(index, value);
        },

        add: function (value) {
            this.checkReadOnly();
            this.items.push(value);
        },

        addRange: function (items) {
            this.checkReadOnly();

            var array = Bridge.toArray(items),
                i,
                len;

            for (i = 0, len = array.length; i < len; ++i) {
                this.items.push(array[i]);
            }
        },

        clear: function () {
            this.checkReadOnly();
            this.items = [];
        },

        indexOf: function (item, startIndex) {
            var i, el;

            if (!Bridge.isDefined(startIndex)) {
                startIndex = 0;
            }

            if (startIndex !== 0) {
                this.checkIndex(startIndex);
            }

            for (i = startIndex; i < this.items.length; i++) {
                el = this.items[i];

                if (el === item || Bridge.EqualityComparer$1.$default.equals(el, item)) {
                    return i;
                }
            }

            return -1;
        },

        insertRange: function (index, items) {
            this.checkReadOnly();

            if (index !== this.items.length) {
                this.checkIndex(index);
            }

            var array = Bridge.toArray(items);

            for (var i = 0; i < array.length; i++) {
                this.insert(index++, array[i]);
            }
        },

        contains: function (item) {
            return this.indexOf(item) > -1;
        },

        getEnumerator: function () {
            return new Bridge.ArrayEnumerator(this.items);
        },

        getRange: function (index, count) {
            if (!Bridge.isDefined(index)) {
                index = 0;
            }

            if (!Bridge.isDefined(count)) {
                count = this.items.length;
            }

            if (index !== 0) {
                this.checkIndex(index);
            }

            this.checkIndex(index + count - 1);

            var result = [],
                i;

            for (i = index; i < count; i++) {
                result.push(this.items[i]);
            }

            return new Bridge.List$1(T)(result);
        },

        insert: function (index, item) {
            this.checkReadOnly();

            if (index !== this.items.length) {
                this.checkIndex(index);
            }

            if (Bridge.isArray(item)) {
                for (var i = 0; i < item.length; i++) {
                    this.insert(index++, item[i]);
                }
            } else {
                this.items.splice(index, 0, item);
            }
        },

        join: function (delimeter) {
            return this.items.join(delimeter);
        },

        lastIndexOf: function (item, fromIndex) {
            if (!Bridge.isDefined(fromIndex)) {
                fromIndex = this.items.length - 1;
            }

            if (fromIndex !== 0) {
                this.checkIndex(fromIndex);
            }

            for (var i = fromIndex; i >= 0; i--) {
                if (item === this.items[i]) {
                    return i;
                }
            }

            return -1;
        },

        remove: function (item) {
            this.checkReadOnly();

            var index = this.indexOf(item);

            if (index < 0) {
                return false;
            }

            this.checkIndex(index);
            this.items.splice(index, 1);
            return true;
        },

        removeAt: function (index) {
            this.checkReadOnly();
            this.checkIndex(index);
            this.items.splice(index, 1);
        },

        removeRange: function (index, count) {
            this.checkReadOnly();
            this.checkIndex(index);
            this.items.splice(index, count);
        },

        reverse: function () {
            this.checkReadOnly();
            this.items.reverse();
        },

        slice: function (start, end) {
            this.checkReadOnly();

            return new Bridge.List$1(this.$$name.substr(this.$$name.lastIndexOf('$')+1))(this.items.slice(start, end));
        },

        sort: function (comparison) {
            this.checkReadOnly();
            this.items.sort(comparison);
        },

        splice: function (start, count, items) {
            this.checkReadOnly();
            this.items.splice(start, count, items);
        },

        unshift: function () {
            this.checkReadOnly();
            this.items.unshift();
        },

        toArray: function () {
            return Bridge.toArray(this);
        },

        checkReadOnly: function () {
            if (this.readOnly) {
                throw new Bridge.NotSupportedException();
            }
        }
    }));
});

Bridge.Class.generic('Bridge.ReadOnlyCollection$1', function (T) {
    var $$name = Bridge.Class.genericName('Bridge.ReadOnlyCollection$1', T);

    return Bridge.Class.cache[$$name] || (Bridge.Class.cache[$$name] = Bridge.define($$name, {
        inherits: [Bridge.List$1(T)],
        constructor: function (list) {
            if (list == null) {
                throw new Bridge.ArgumentNullException("list");
            }

            Bridge.ReadOnlyCollection$1.prototype.$constructor.call(this, list);
            this.readOnly = true;
        }
    }));
});
