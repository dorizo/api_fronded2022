import { Button } from '@mui/material';
import { useParams } from 'react-router';

export default function BackupFile() {
    const params = useParams();
    const downloadFile = (id) => {
        /* eslint-disable prefer-const */
        /* eslint-disable no-alert */
        /* eslint-disable no-useless-escape */
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        let filePath = `${process.env.REACT_APP_API_URL}project/backup/id/${id}`;
        fetch(filePath, { headers })
            .then(async (response) => {
                const b = await response.blob();
                let a = document.createElement('a');
                let url = URL.createObjectURL(b);
                a.href = url;
                a.download = `DATA-PROJECT-${id}.zip`;
                a.click();
            })
            .catch((err) => alert(err));
    };

    return (
        <Button fullWidth variant="contained" color="warning" onClick={() => downloadFile(params.idProject)}>
            Backup File
        </Button>
    );
}
