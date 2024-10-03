//still in progress, need to add the logic for adding users to groups
//this is a dummy example
export default function GroupsPage() {
    

    return (
    <div className="container">
      <div>
        <button>Add to group</button>
      </div>

      <div>

        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Juniors</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <td>Mark Walhberg</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Ivan Bižanić</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Bruno Potečki</td>
                </tr>
            </tbody>
        </table>
      

        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cadettes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <td>Machado Kristian</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Ivan Božiković</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Bruno Paralica</td>
                </tr>
            </tbody>
        </table>
        
        <table className="table table-dark table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Seniors</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <td>Mark Srakosha</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Ivan Lukavić</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td>Bruno Petković</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    )
  }
  