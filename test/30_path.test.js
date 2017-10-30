const _lib = require('./lib');
const _path = require('path');
const _assert = require('assert');
const _fs = require('fs-magic');

const _snapshotRootWhitespace = '/tmp/snapshot_root with whitespaces';
const _backupDirWhitespaces = '/tmp/my config with whitespaces';

describe('path', function(){

    before(async function(){
        if (!_fs.statx(_snapshotRootWhitespace)){
            _fs.mkdir(_snapshotRootWhitespace);
        }
        if (!_fs.statx(_backupDirWhitespaces)){
            _fs.mkdir(_backupDirWhitespaces);
        }
    });

    it('should pass - valid, minimal config with whitespaces in backup source', function(){
        return _lib.rsnapshotDynamicConfig([
            'config_version 1.3',
            `cmd_cp ${_lib.bin.cp}`,
            `cmd_rm ${_lib.bin.rm}`,
            `cmd_rsync ${_lib.bin.rsync}`,
            `snapshot_root ${_lib.path.snapshotRoot}`,
            'retain alpha 6',
            `backup "${_backupDirWhitespaces}" local`

        ], 'configtest');
    });

    it('should pass - valid, minimal config with whitespaces in snapshot root', function(){
        return _lib.rsnapshotDynamicConfig([
            'config_version 1.3',
            `cmd_cp ${_lib.bin.cp}`,
            `cmd_rm ${_lib.bin.rm}`,
            `cmd_rsync ${_lib.bin.rsync}`,
            `snapshot_root "${_snapshotRootWhitespace}"`,
            'retain alpha 6',
            'backup "/etc" local'

        ], 'configtest');
    });
    

});
